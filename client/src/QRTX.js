import React, { Component } from "react";
import EthereumQRPlugin from 'ethereum-qr-code'
const qr = new EthereumQRPlugin()

class QRTX extends Component {


  handleQRGenerator = () =>{
    const qrCode = qr.toCanvas(  {
      "to": "0x8958aD064461457197f8b3c341E85709c7300899",
      "from": "0xB9dC3F3b3cAdeB7FEFBE0A78BF70fD2635B148EF",
      "gas": 100000,
      "mode": "erc20__transfer",
      "argsDefaults": [
        {
          "name": "to",
          "value": "0xc91033ed07DA0A4664ab58c69441F3e6180492F7"
        },
        {
          "name": "value",
          "value": 10
        }
      ]
    }, {selector: '#my-qr-code'})
  }


  render() {
    return (
      <div className="my-qr-code" id="my-qr-code">
        <button onClick={this.handleQRGenerator}>Generate QR</button>
      </div>
    );
  }

}

export default QRTX
