import React, { Component, Fragment } from "react";
import { Col } from "react-bootstrap";

class Profile extends Component {

  formatDate = date => (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())

  render() {
    const authData = this.props.auth;
    let subscriptions;
    
    if(this.props.subscriptions.length > 0) {
      subscriptions = this.props.subscriptions.map(subscription => (

        <div className="redeem-sidebar" key={subscription.SubscriptionId}>

          <div className="redeem-section">
            <div className="redeem-title">Your phone number</div>
            <span>{authData.phone.number}</span>
          </div>

          <div className="redeem-section">
            <div className="redeem-title">Subscription</div>
            <span>
              {new Date(subscription.EndDate) > new Date() ? 'ACTIVE' : subscription.IsAutoRenew ? 'active' : 'Inactive'}
            </span>
          </div>

          {new Date(subscription.EndDate) > new Date() ?
            <Fragment>
              <div className="redeem-section">
                <div className="redeem-title">Start date</div>
                <span>{this.formatDate(new Date(subscription.StartDate))}</span>
              </div>

              <div className="redeem-section">
                <div className="redeem-title">End date</div>
                <span>{this.formatDate(new Date(subscription.EndDate))}</span>
              </div>

              <div className="redeem-section">
                <div className="redeem-title">Auto renew</div>
                <span>{subscription.isAutoRenew === true ? 'Yes' : 'No'}</span>
              </div>
            </Fragment> : ''}

        </div>
      ))
      
    } else {
      subscriptions =  <div className="redeem-sidebar">
        <div className="redeem-section">
          <div className="redeem-title">Your phone number</div>
          <span>{authData.phone.number}</span>
        </div>

        <div className="redeem-section">
          <div className="redeem-title">Subscription</div>
          <span>
            Inactive
          </span>
        </div>
      </div>
    }

    return (
      <Col sm="12" md="5" lg="4">
        {subscriptions}
      </Col>
    )
  }
}

export default Profile;