import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { LocalizeProvider } from "react-localize-redux";

import Auth from "./utils/auth";

import Home from "./containers/home";
import Redeem from "./containers/redeem";
import Premium from "./containers/premium";
import Error from "./containers/error";

import Header from "./components/header";
import Footer from "./components/footer";
import ScrollTop from "./components/scrolltop";

const auth = new Auth();
auth.loadAuth();

class App extends Component {

  render() {
    return (
      <LocalizeProvider>
        <Fragment>
          <Header auth={auth}/>
          <main>
            <ScrollTop/> 
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/profile" render={()=> <Redeem auth={auth} />} />
              <Route exact={true} path="/premium" render={()=> <Premium auth={auth} />} />
              <Route status={404} component={Error} />
            </Switch>
          </main>
          <Footer/>
        </Fragment>
      </LocalizeProvider>
    );
  }

}

export default App;
