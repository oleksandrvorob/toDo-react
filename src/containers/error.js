import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";


class Error extends Component {
  
  render() {
    return (
      <div className="page-content bg-gradient" id="content">
        <section>
          <Container>
            <Row>
              <Col>
                <div className="u-text-center">
                  <h1>Page Not Found</h1>
                  <p className="u-text-white">Sorry, the page you were trying to view doesn't exist.</p>
                  <div className="buttons u-margin-top">
                    <Link to="/" className="btn-primary">Go Home</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

export default Error;
