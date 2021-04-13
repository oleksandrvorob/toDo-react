import React, { Component, Fragment } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Profile from "../components/profile";
import CodeValidation from "../components/codevalidation";

import axios from "axios";

const config = { 
  headers: {
      "Authorization" : `53b9e049186e04743bcdd685ea0bafbd1ff9e0c7f`,
  }
};

class Redeem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
      unmounted: false
    }
    this.loadSubscriptions = this.loadSubscriptions.bind(this);
  }

  componentDidMount() {
     if (!this.state.unmounted) {
        this.loadSubscriptions();
     }
  }


  componentWillUnmount(){
      this.setState({ unmounted:true })
  }  

  async loadSubscriptions() {
    try {
      const subscriptionsData = await this.props.auth.loadSubscriptions();
      this.setState({ subscriptions: subscriptionsData.data, });
      this.getSubscription(this.props.auth.authData.phone.number, 'subscription_id', 'transaction_id');
    }
    catch (err) {
      this.setState({ subscriptions: [] })
    }
  }

  getSubscription(Msisdn, subscription_id, transaction_id) {
    var _this = this;
    var TnsType = '';
    axios.get(`https://api.ecurring.com/subscriptions/${subscription_id}`, config).then(res => {
      if(res.data.status === "active" || res.data.status === "resumed") {
        TnsType = 'Sub';
      }
      else {
        TnsType = 'Unsub';
      }
      _this.callConnectAPI(Msisdn, transaction_id, TnsType);
    }).catch(err => {
      console.log(err);
    });
  }

  callConnectAPI(Msisdn, TnsId, TnsType) {
    axios.post(`https://api.com/connect/`, {msisdn: Msisdn, tnsId: TnsId, tnsType: TnsType}).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  refreshSubscriptions = () => {
    this.props.auth.loadSubscriptions();
  }

  onClick = () => {
    this.props.auth.logout();
    this.props.history.push("/");
  }

  render() {
    const auth = this.props.auth;
    let authProfile;

    if (!auth.isAuthenticated()) {
      authProfile = <Redirect to="/" />
    } else {
      authProfile = <Col className="justify-content-center align-self-center">
        <Row>
          <Profile auth={auth.authData} subscriptions={this.state.subscriptions} />
          <CodeValidation onValidate={this.loadSubscriptions} auth={auth} />
        </Row>
        <Row>
          <Col sm="12" className="btn-logout u-align-right">
            <button className="btn-secondary" onClick={this.onClick}>Log out</button>
          </Col>
        </Row>
      </Col>
    }

    return (
      <Fragment>
        <div className="page-content bg-gradient" id="content">
          <div className="redeem-header">
            <Container>
              <Row>
                <Col>
                  <h1>Redeem your voucher</h1>
                </Col>
              </Row>
            </Container>
          </div>

          <section className="redeem">
            <Container>
              <Row>
                {authProfile}
              </Row>
            </Container>
          </section>
        </div>

      </Fragment>
    )
  }
}

export default withRouter(Redeem);
