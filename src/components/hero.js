import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class Hero extends Component {

  render() {
    return ( 
      <section className="hero">
        <div className="hero-content">
          <Container className="justify-content-center align-self-center">
            <Row>
              <Col sm="12" md="6" lg="6" className="hero-details">
                <h1 className="hero-heading">Welcome to TD</h1>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default Hero;
