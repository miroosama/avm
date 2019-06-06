import React, { Component } from "react";
import EthereumQRPlugin from 'ethereum-qr-code'
import Button from 'react-bootstrap/Button'
const qr = new EthereumQRPlugin()

class QRTX extends Component {


  handleQRGenerator = () =>{
    const qrCode = qr.toCanvas(  {
      "to": "0x8958aD064461457197f8b3c341E85709c7300899",
      "from": this.props.account,
      "gas": 100000,
      "mode": "erc20__transfer",
      "argsDefaults": [
        {
          "name": "to",
          "value": this.props.to
        },
        {
          "name": "value",
          "value": this.props.amount
        }
      ]
    }, {selector: '#my-qr-code'})
  }


  render() {
    return (
      <div className="App">
        <div className="my-qr-code" id="my-qr-code">
        </div>
        <Button style={{fontWeight: "bold"}} variant="outline-dark" onClick={this.handleQRGenerator}>Generate QR</Button>
      </div>
    );
  }

}

export default QRTX
