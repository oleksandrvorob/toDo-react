import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Translate } from "react-localize-redux";

class Footer extends Component {

  render() {
    return (
      <footer>
        <p>Copyright &copy; TD.</p>
      </footer>
    );
  }
}

export default Footer;
