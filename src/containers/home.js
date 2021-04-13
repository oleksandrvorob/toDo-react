import React, { Component } from "react";
import { withLocalize } from "react-localize-redux";

import { Container, Row, Col } from "react-bootstrap";
import ScrollableAnchor from "react-scrollable-anchor";

import Hero from "../components/hero";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="page-content" id="content">
        <Hero/>

        <ScrollableAnchor id="trending">
          <section className="section-trending">
            <Container>
              <Row>
                <Col sm="12" md="5" lg="5" className="justify-content-center align-self-center">
                  <h2 className="section-intro">Subheading 1</h2>
                  <div className="section-heading">Heading 1</div>
                </Col>
              </Row>
            </Container>
          </section>
        </ScrollableAnchor>

        <ScrollableAnchor id="subscriptions">
          <section className="section-subscriptions">
            <Container>
              <Row>
                <Col sm="12" md="6" lg="5" className="justify-content-center align-self-center">
                  <h2 className="section-intro">Subheading 2</h2>
                  <div className="section-heading">Heading 2</div>
                </Col>
              </Row>
            </Container>
          </section>
        </ScrollableAnchor>

        <ScrollableAnchor id="vouchers">
          <section className="section-vouchers"> 
            <Container>
              <Row>
                <Col sm="12" md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }} className="justify-content-center align-self-center u-text-center">
                  <h2 className="section-intro">Subheading 3</h2>
                  <div className="section-heading">Heading 3</div>
                  <p><a href="../premium" className="btn-buy">Buy Now</a></p>
                </Col>
              </Row>
            </Container>
          </section>
        </ScrollableAnchor>
      </div>
    );
  }
}

export default withLocalize(Home);
