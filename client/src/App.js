import React, { Component } from "react";
import AviumTokenContract from "./build/contracts/AviumToken.json";
import AviumTokenSaleContract from "./build/contracts/AviumTokenSale.json";
import getWeb3 from "./utils/getWeb3";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import QRTX from "./QRTX.js"
import './style.css'
import UnitFormModal from "./UnitFormModal.js"
import QRModal from "./QRModal.js"
import TransitionGroup from 'react-addons-transition-group';
import About from "./About"
import {TweenMax, Power1, TimelineLite} from "gsap";
import GSAP from 'react-gsap-enhancer'

import "./App.css";

class App extends Component {
  state = {
     web3: null,
     accounts: null,
     contractToken: null,
     contractSale: null,
     symbol: "" ,
     amount: "",
     totalSupply: "",
     balance: "",
     success: "",
     unitModal: false,
     approvalAddress: "",
     addressInput: false,
     qrModal: false,
     about: false,
   };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = AviumTokenContract.networks[networkId]
      const deployedNetwork2 = AviumTokenSaleContract.networks[networkId];
      const instanceToken = new web3.eth.Contract(
        AviumTokenContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const instanceTokenSale = new web3.eth.Contract(
        AviumTokenSaleContract.abi,
        deployedNetwork && deployedNetwork2.address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      console.log(AviumTokenContract.abi)
      this.setState({ web3, accounts, contractToken: instanceToken, contractSale: instanceTokenSale }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    // this.setState({about: true})
  };

  runExample = async () => {
    const { accounts, contractToken, contractSale } = this.state;
    contractToken.methods.balanceOf(this.state.accounts[0]).call().then(res=>{this.setState({balance: parseInt(res)})})
    contractToken.methods.balanceOf(contractSale.address).call().then(res=>{this.setState({totalSupply: parseInt(res)})})
  };

  handlePurchase = async (e) => {
    e.preventDefault()
    const { accounts, contractToken, contractSale } = this.state;
    var tokenPrice = 1000000000000000
    console.log(accounts[0], this.state.amount)
    contractSale.methods.buyTokens(this.state.amount).send({from: accounts[0], value: (this.state.amount * tokenPrice) , gas: 500000 }, (res) => {
      let newBalance = (parseFloat(this.state.balance) + parseFloat(this.state.amount))
      let newSupply = (parseFloat(this.state.totalSupply) - parseFloat(this.state.amount))
      this.setState({balance: newBalance, totalSupply: newSupply, amount: ""})})
  }

  handleAmount = (e) =>{
    this.setState({ amount: e.target.value})
  }

  handleUnit = (account, amount) =>{
    const { accounts, contractToken, contractSale } = this.state;
    contractToken.methods._pendingPayment(account, amount).send({from: accounts[0]}).then(res => console.log(res))
  }

  handleApproval = (e) => {
    e.preventDefault(e)
    const { accounts, contractToken, contractSale } = this.state;
    contractToken.methods._makePayment(accounts[0], this.state.approvalAddress).send({from: accounts[0]})
    this.setState({approvalAddress: "", addressInput: false})
  }

  closeModal = (action, account, amount) =>{
    this.setState({unitModal: false, qrModal: false })
    if(action == "process"){
      this.handleUnit(account, amount)
    }
  }

  openUnitModal = (action) => {
    if(action == "qr") {
      this.setState({qrModal: !this.state.qrModal})
      } else {
      this.setState({unitModal: !this.state.unitModal})
    }
  }

  handleInputButton = () => {
    this.setState({addressInput: !this.state.addressInput})
  }

  handleAddressInput = (e) =>{
    this.setState({approvalAddress: e.target.value})
  }

  handleAbout = () =>{
    this.setState({ about: !this.state.about})
  }

  render() {
    console.log(this.state.unitModal)
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="bkg" />
        <div className="me" />
        <h1>AVEMCOIN</h1>
        <h2>Purchase Token</h2>
        <h4>
          Total AVM Available: {this.state.totalSupply}
        </h4>
        <Form style={{ width: "50%", justifyContent: "center"}} onChange={this.handleAmount}>
          <Form.Group md="4" controlId="TokenPurchase">
            <Form.Label>Purchase Amount</Form.Label>
            <Form.Control style={{backgroundColor: "transparent"}} type="number" placeholder="Token Amount" />
          </Form.Group>
            <Button style={{fontWeight: "bold"}} variant="outline-dark" type="submit" onClick={this.handlePurchase}>
                Submit
           </Button>
      </Form>
      <div>
        <Button style={{marginBottom: "20px", fontWeight: "bold"}} variant="outline-dark" onClick={this.openUnitModal}>Manual Unit Entry</Button>
          {this.state.unitModal ? <UnitFormModal closeModal={this.closeModal} /> : null }
      </div>
         <Button style={{ marginBottom: "20px", fontWeight: "bold"}} variant="outline-dark" onClick={this.handleInputButton}>Approve Unit Payment</Button>
         {this.state.addressInput ?
           <div>
             <Form style={{ width: "50%", justifyContent: "center"}} onChange={this.handleAddressInput}>
               <Form.Group md="4" controlId="SendUnitPayment">
                 <Form.Label>Address To</Form.Label>
                 <Form.Control style={{backgroundColor: "transparent"}} type="string" placeholder="Address" />
               </Form.Group>
           <Button style={{marginBottom: "20px", fontWeight: "bold"}} variant="outline-dark" type="submit" onClick={this.handleApproval}>
             Submit
           </Button>
            </Form>
           </div>
             : null
         }
         <div className="App">
            Your account: {this.state.accounts[0]}
        </div>
          <div className="App">
            Your balance: {this.state.balance}
          </div>
          <div>
          <Button style={{fontWeight: "bold"}} variant="outline-dark" onClick={() => {this.openUnitModal("qr")}}>Create QR</Button>
            {this.state.qrModal ? <QRModal closeModal={this.closeModal} accountFrom={this.state.accounts[0]} /> : null }
        </div>
        <TransitionGroup>
          {this.state.about && <About />}
        </TransitionGroup>
        <button onClick={this.handleAbout} class="button">Toggle About</button>
      </div>
    );
  }
}


export default App;
