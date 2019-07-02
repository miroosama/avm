import React, { Component } from 'react';
import { Modal, Button, Dropdown, Form, Alert } from 'react-bootstrap'
import './style.css';
import "./App.css";
import QRTX from "./QRTX.js"

class QRModal extends Component {

  state = {
    error: false,
    account: "",
    amount: ""
  }

  handleAddress = (e) => {
    this.setState({account: e.target.value})
  }

  handleAmount = (e) => {
    this.setState({amount: e.target.value})
  }



  render() {
    return (
      <div className="App">
        <Modal style={{opacity:".9"}} show={true} onHide={() => {this.props.closeModal("cancel")}}>
          <Modal.Header>
            <Modal.Title>Generate Unit QR</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <Form onChange={this.handleAddress}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="string" placeholder="0" />
                  </Form.Group>
                </Form>
                <Form onChange={this.handleAmount}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Value</Form.Label>
                    <Form.Control type="number" placeholder="0" />
                  </Form.Group>
                </Form>
                <QRTX account={this.props.accountFrom} to={this.state.account} amount={this.state.amount}/>
              </Modal.Body>
          <Modal.Footer>
            <Button variant="light">Print</Button>
            <Button variant="light" onClick={() => {this.props.closeModal("cancel")}}>Close</Button>
          </Modal.Footer>
        </Modal>;
      </div>
    );
  }
}

export default QRModal;
