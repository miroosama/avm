import React, { Component } from 'react';
import { Modal, Button, Dropdown, Form, Alert } from 'react-bootstrap'

class UnitFormModal extends Component {

  state = {
    error: false,
    from: "From",
    to: "To",
    amount: ""
  }

  handleSelection = (event) => {
    this.setState({
    from:event.target.id
    })
  }

  handleSelection2 = (event) => {
    this.setState({
      to:event.target.id
    })
  }

  handleChange = (e) => {
    this.setState({amount: e.target.value})
  }




  render() {
    return (
      <div>
        <Modal show={true} onHide={() => {this.props.closeModal("transferModal")}}>
          <Modal.Header>
            <Modal.Title>Transfer</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form onChange={this.handleChange}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" placeholder="0" />
                </Form.Group>
              </Form>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {this.props.closeModal("transferModal")}}>Close</Button>
            <Button onClick={this.handleSave} variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal>;
      </div>
    );
  }
}

export default UnitFormModal;
