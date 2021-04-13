import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";

class MobileNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    }
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  closeMenu() {
    this.setState({menuOpen: false})
  }

  toggleMenu() {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  render() {

    return (
      <nav className="nav-mobile" id="navigation">
        <Menu
          right 
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="../#trending" onClick={() => this.closeMenu()}>Trending</a></li>
            <li><a href="../#subscriptions" onClick={() => this.closeMenu()}>Subscriptions</a></li>
            <li><a href="../#vouchers" onClick={() => this.closeMenu()}>Vouchers</a></li>
          </ul>
          <div className="nav-footer">
            <div className="footer-copyright">
              &copy; TD
            </div>

          </div>
        </Menu>
      </nav>
    )
  }
}

export default MobileNav;