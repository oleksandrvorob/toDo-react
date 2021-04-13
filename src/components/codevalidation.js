import React, { Component, Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const storeId = process.env.REACT_APP_STOREID;
const base_services_api = process.env.REACT_APP_SERVICES_API_BASE;

class CodeValidation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation_code: '',
      message: '',
      cssclass: 'success',
    }
  }

  onChange = (e) => {
    const val = e.target.value;
    for(let i in val) {
      if(/[a-zA-Z0-9]/.test(val[i]) === false)  
        return;
    }

    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  onValidateClick = () => {
    //console.log(this.props.auth.authData.access_token)
    axios.post(`${base_services_api}/users/redeemvoucher?code=${this.state.validation_code}`, null, { headers: { 'StoreId': storeId, 'Authorization': `Bearer ${this.props.auth.authData.access_token}`}})
      .then(resp => {
        this.props.onValidate();
        this.setState({ message: "Subscription activated successfully!", cssclass: 'status-success'})
      })
      .catch(err => this.setState({ 
        message: "Voucher is not valid.", 
        cssclass: 'status-error' 
      }))
  }

  render() {
    return(
      <Fragment>
        <Col sm="12" md="6" lg="6" className="justify-content-center align-self-center">

          <p className="u-text-white">Redeem your voucher below to active your subscription.</p>

          <Row>
            <Col xs="12">
              <div className={this.state.cssclass}>
                {this.state.message}
              </div>
            </Col>
          
            <Col sm="12">
              <label>Voucher code</label>
            </Col>

            <Col sm="12" md="8" lg="8">
              <input type="text" className="redeem-input" name="validation_code" value={this.state.validation_code} onChange={this.onChange} placeholder="Enter code" maxLength="12"/>
            </Col>

            <Col sm="12" md="4" lg="4">
              <button className="btn-primary btn-validate" onClick={this.onValidateClick}>Validate</button>
            </Col>

          </Row>
        </Col>
      </Fragment>
    )
  }
}

export default CodeValidation;
