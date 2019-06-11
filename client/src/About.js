
import React, { Component } from 'react';
import './style.css'
import {TweenMax, Power1, TimelineLite} from "gsap";
import GSAP from 'react-gsap-enhancer'
import TransitionGroup from 'react-addons-transition-group';

class About extends React.Component {

  state = {
    infoClicked: false,
  }

  componentWillEnter (callback) {
  const el = this.container;
  this.setState({ infoClicked: true})
  console.log(el)
  TweenMax.fromTo(el, 0.8, {x: -100, opacity: .5, rotation:0}, {x: 190, opacity: .9, rotation:180, onComplete: callback});
}

componentWillLeave (callback) {
  const el = this.container;
  this.setState({ infoClicked: false})
  TweenMax.fromTo(el, 0.8, {x: 50, opacity: .5, rotation:-180}, {x: -25, opacity: 0, rotation:0, onComplete: callback});
}

  render () {

    return(
      <div>
        <div className="news1" ref={c => this.container = c} />
          {this.state.infoClicked ?
          <div className="infoDiv">
              <h4 className="mo">Welcome to AVM!</h4>
                <p className="mo">Currently in preview version form and deployed on the Rinkeby test network, AVM is the coin providing smart contract solutions for international trade.
                </p>
                <img className="images" src="https://cdn-images-1.medium.com/max/953/1*yRHg1YaldBSlzvJOSFtiTw.png" alt="metamask" height="200" width="200"/>
                <p className="nbor">Sign in to your Ethereum account through the Metamask extension and select the Rinkeby network.
                With ether you can purchase AVM and utilize the AVEM smart contracts.
                </p>
                <p className="descr">Our current functionality provides a user the ability to represent goods with pending payments that can later be approved.
                Designed to optimize the relationship between manufacturers and distributors, both parties agree on a value per unit. Enter the value and recipient (manufacturer) address in the Create QR form. Through the mobile app (available Summer 2019) scan the
                generated QR code found on the physical unit that contains the agreed upon unit information and cements the pending payment onto the blockchain. Once all the units are accounted for upon arrival Approve Unit Payment will send the combined unit values to the recipient's AVM account to provide minimal transaction fees.
                </p>
          </div>
          : null
        }
      </div>
    )
  }
}

export default (About);
