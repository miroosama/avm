/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import './global';
 import './shim'

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import ScanScreen from './QRScan.js'
import 'babel-preset-react-native-web3/globals'
import Web3 from 'web3'
import AviumTokenContract from "./contractBuild/contracts/AviumToken.json"
const Tx = require('ethereumjs-tx');
// const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/3ae9e02bbab741769e12d6ea56bce8a4"))

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {
  state = {
    scan: false,
    latest: "",
    contractToken: "",
    unsignedTXs: [],
  }

  componentDidMount() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/3ae9e02bbab741769e12d6ea56bce8a4')
  );
    this.setState({web3: web3})
    web3.eth.getBlock('latest').then(res => this.setState({latest: res.hash}))

    this.loadContract()
    // 1bb0c42529917f67e7a4052f7247b1f12c94ef84c9a341561301128cae14e78b
}

loadContract = async () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/3ae9e02bbab741769e12d6ea56bce8a4')
  );
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = AviumTokenContract.networks[networkId]
    const instanceToken = new web3.eth.Contract(
      AviumTokenContract.abi,
      deployedNetwork && deployedNetwork.address,
    );

  this.setState({contractToken: instanceToken})
}

  pendingPayment = () => {
  const { web3 } = this.state;
    web3.eth.getTransactionCount("0x24965a52d85b612bae2f80813683ff2ce126c12c", function (err, nonce) {
    var data = new web3.eth.Contract(AviumTokenContract.abi, "0x2dE38B41347bECCCC7fdaAb72752F91A6E47C6fa")
    const contractFunction = data.methods._pendingPayment("0x66CBc037732FaE39dDc2725343580e4489Fc3d48", 10);
    const functionAbi = contractFunction.encodeABI();
    console.log(data)
      var tx = new Tx({
        nonce: nonce,
        gasPrice: 4700000,
        gasLimit: 100000,
        to: "0x2dE38B41347bECCCC7fdaAb72752F91A6E47C6fa",
        value: 0,
        data: functionAbi,
      });
    tx.sign(Buffer.from('ccddf04d5bdebf26abb65ed3fa5916374ad42df45242c35b1e873bfc28582827', 'hex'));
    console.log(tx)
    var raw = '0x' + tx.serialize().toString('hex');
    // web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
    //   console.log(transactionHash);
    // });
    console.log(raw)
    }).catch(function(err){console.log(err)});
    this.setState({unsignedTxs: [...this.state.unsignedTXs, raw]})
    console.log(this.state.unsignedTXs)
}


  handleScanner = () => {
    this.setState({
      scan: !this.state.scan
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.handleScanner} title="Scan">Scan</Button>
        {this.state.scan ? <ScanScreen pendingPayment={this.pendingPayment}/> : null}
        <Text>Data: {this.state.latest}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
