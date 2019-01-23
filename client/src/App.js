import React, { Component } from "react";
import AviumTokenContract from "./build/contracts/AviumToken.json";
import AviumTokenSaleContract from "./build/contracts/AviumTokenSale.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = {
     web3: null,
     accounts: null,
     contractToken: null,
     contractSale: null,
     symbol: "" ,
     amount: "",
     totalSupply: ""
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

      const deployedNetwork = AviumTokenContract.networks[networkId];
      const deployedNetwork2 = AviumTokenSaleContract.networks[networkId]
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
      this.setState({ web3, accounts, contractToken: instanceToken, contractSale: instanceTokenSale }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contractToken, contractSale } = this.state;
    // this.setState({symbol: this.state.contractToken._jsonInterface[3].name})
    // console.log(contractToken.methods.symbol().call().then(resp =>{console.log(resp)}))
        console.log(contractSale._address)
    console.log(contractToken._address)
    console.log(accounts[0])
    console.log(contractSale)

    contractToken.methods.totalSupply().call().then(res => {this.setState({totalSupply: res})})
  };

  handlePurchase = async (e) => {
    e.preventDefault()
    const { accounts, contractToken, contractSale } = this.state;
    // console.log(contractToken.methods.totalSupply().call().then(res => {console.log(res)}))
    console.log(this.state.totalSupply)
    console.log(contractSale.methods.buyTokens(10))
    var tokenPrice = 1000000000000000
    // console.log(contractToken.methods.balanceOf(accounts[0]).call().then(res=>{console.log(res)}))s
    // console.log(contractToken.methods.transfer(contractToken._address, (this.state.totalSupply - 250000)).send({from: accounts[0]}).then(res=>{console.log(res)
    // contractSale.methods.buyTokens(10).send({from: accounts[1], value: 10 * 1000000000000000}).then(res =>{console.log(res)})
    // }))
    // console.log(contractSale.methods.buyTokens(10).send({from: accounts[0]}).then(res =>{console.log(res)}))
    console.log(contractSale.methods.buyTokens(10).send({from: accounts[0], value: (10 * tokenPrice) , gas: 500000 }).then(res =>{console.log(res)}))
    // console.log(contractSale.methods.tokenPrice().call().then(res=>{console.log(res)}).catch(err=>{console.log(err)}))
    // console.log(contractToken.methods.symbol().call().then(resp =>{console.log(resp)}))

    // contractSale.methods.buyTokens()
    // contractSale.methods.buyTokens(this.state.amount).call.then(res => {console.log(res)})
  }

  handleAmount = (e) =>{
    this.setState({ amount: e.target.value})
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>AVEMCOIN</h1>
        <h2>Purchase Token</h2>
        <form>
          <input type="number" name="amount" onChange={this.handleAmount}/>
          <input onClick={this.handlePurchase} type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default App;
