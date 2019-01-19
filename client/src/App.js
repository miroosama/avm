import React, { Component } from "react";
import AviumTokenContract from "./build/contracts/AviumToken.json";
import AviumTokenSaleContract from "./build/contracts/AviumTokenSale.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contractToken: null, contractSale: null, symbol: "" };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = AviumTokenContract.networks[networkId];
      const instanceToken = new web3.eth.Contract(
        AviumTokenContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const instanceTokenSale = new web3.eth.Contract(
        AviumTokenSaleContract.abi,
        deployedNetwork && deployedNetwork.address,
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
    const { accounts, contractToken } = this.state;
    this.setState({symbol: this.state.contractToken._jsonInterface[3].name})
    console.log(contractToken.methods.symbol().call().then(resp =>{console.log(resp)}))
    console.log(contractToken.methods)
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.symbol}</div>
      </div>
    );
  }
}

export default App;
