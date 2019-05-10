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
  }

  componentDidMount() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/3ae9e02bbab741769e12d6ea56bce8a4')
  );
  // this.setState({web3: web3})
  web3.eth.getBlock('latest').then(res => this.setState({latest: res.hash}))

  this.loadContract()

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

  console.log(instanceToken)
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
        {this.state.scan ? <ScanScreen /> : null}
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
