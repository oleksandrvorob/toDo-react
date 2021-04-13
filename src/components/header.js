import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import MediaQuery from "react-responsive";

import FBLogin from "../components/fblogin";
import MobileNav from "../components/nav";

class Header extends Component {
  
  render() {
    const path = this.props.location.pathname;
    return ( 
      <header>

        <Container className="header">
          <a href="/" className="logo">TD</a>
          <nav className="nav-desktop">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="../#trending">Trending</a></li>
              <li><a href="../#subscriptions">Subscriptions</a></li>
              <li><a href="../#vouchers">Vouchers</a></li>
            </ul>
          </nav>
          
          {path === "/redeem" ? 
          <p></p>
           : <Fragment>
           <MediaQuery query="(max-width: 575.98px)">
             <FBLogin auth={this.props.auth} btnText="Redeem Voucher" btnClass="nav-btn" />
           </MediaQuery>
           <MediaQuery query="(min-width: 576px)">
             <FBLogin auth={this.props.auth} btnText="Redeem Voucher" btnClass="nav-btn" />
           </MediaQuery>
         </Fragment> }
              
          <MobileNav pageWrapId={"page-content"} outerContainerId={"App"} />
 
        </Container>
      </header> 
    )
  }
}

export default withRouter(Header);
