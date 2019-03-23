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
     totalSupply: "",
     balance: "",
     success: ""
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

    // contractToken.methods.totalSupply().call().then(res => {this.setState({totalSupply: res})})
    contractToken.methods.balanceOf(accounts[0]).call().then(res=>{this.setState({balance: res})})
    contractToken.methods.balanceOf(contractSale._address).call().then(res=>{this.setState({totalSupply: res})})
  };

  handlePurchase = async (e) => {
    e.preventDefault()
    const { accounts, contractToken, contractSale } = this.state;
    var tokenPrice = 1000000000000000
    contractSale.methods.buyTokens(this.state.amount).send({from: accounts[0], value: (this.state.amount * tokenPrice) , gas: 500000 })
    .then(res =>{
      let newBalance = (parseFloat(this.state.balance) + parseFloat(this.state.amount))
      let newSupply = (parseFloat(this.state.totalSupply) + parseFloat(this.state.amount))
      this.setState({success: res, balance: newBalance, totalSupply: newSupply})})
    console.log(this.state.success)
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
        <h5>
          Total AVM Available: {this.state.totalSupply}
        </h5>
        <form>
          <input type="number" name="amount" onChange={this.handleAmount}/>
          <input onClick={this.handlePurchase} type="submit" value="Submit"/>
        </form>
        <div>
          <ul>
            <p>
            Your account: {this.state.accounts[0]}
            </p>
            <p>
              Your balance: {this.state.balance}
            </p>
          </ul>

        </div>
      </div>
    );
  }
}

export default App;


// if contract error run a truffle migrate --reset
// AviumTokenSale.deployed().then(function(i){tokenSale=i})
// truffle(development)> AviumToken.deployed().then(function(i){token=i})
// undefined
// truffle(development)> web3.eth.getAccounts().then(function(accounts){ acc1 = accounts[0]})
// undefined
// truffle(development)> tokensAvailable = 750000
// 750000
// truffle(development)> token.transfer(tokenSale.address, tokensAvailable, { from: acc1})
