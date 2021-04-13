import React, { Component } from "react";
import AccountKit from "react-facebook-account-kit";
import { withRouter, Link } from "react-router-dom";
import { withLocalize } from "react-localize-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";

const storeId = process.env.REACT_APP_STOREID;
const base_services_api = process.env.REACT_APP_SERVICES_API_BASE;

const access_token_base_url = 'https://graph.accountkit.com/v1.1/access_token?'
const me_base_url = 'https://graph.accountkit.com/v1.1/me/';

const appId = '246941476215523';
const secret = '3689e266139f14ab9b30d4549ecbd555';

class FBLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      errorMessage: "",
      isLoading: false
    }

  }

  componentWillMount() {
    this.auth = this.props.auth;
  }

  async getToken(code, appId, secret) {
    return axios.get(`${access_token_base_url}grant_type=authorization_code&code=${code}
    &access_token=AA|${appId}|${secret} `);
  }

  async getUserData(token) {
    return axios.get(`${me_base_url}?access_token=${token}`);
  }

  async loginResponse(response) {
    const { status } = response;

    if (status === 'PARTIALLY_AUTHENTICATED') {

      const code = response.code;
      const resp = await this.getToken(code, appId, secret);

      const token = resp.data.access_token;

      const tokenResponse = await this.getUserData(token);

      // Phone number retrieved from FB API and saving to auth object in authData property
      this.auth.authData = tokenResponse.data;
      // Add token property to auth.authData
      this.auth.authData.token = token;

      this.props.history.push('/profile');

      // Login user
      this.loginUser(this.auth, storeId)

    }
  };

  loginUser = (auth, storeId) => {
    const number = auth.authData.phone.number;
    const msisdn = number.substring(1, number.length);
    axios.get(`${base_services_api}/application/grantUrl`, { headers: { 'StoreId': storeId } })
      .then(grantResponse => {
        const grantURL = grantResponse.data.grantURL;
        //console.log(grantResponse);
        axios.post(`${grantURL}`, `grant_type=msisdn&msisdn=${msisdn}&skip_decryption=true`, { headers: { 'StoreId': storeId, 'Content-Type': 'application/x-www-form-urlencoded' }})
          .then(resp => {
            const status = resp.status;

            if (status === 200) {
              this.setState({ isLoading: false });
              //console.log(resp);
              //Get the token from response
              //console.log(resp.data.access_token);
              const accessToken = resp.data.access_token;
              //Decode the base64 encoded token
              const data = jwt_decode(accessToken);
              const sub = data.sub;
              const exp = data.exp;
              //console.log(exp);
              auth.authData.sub = sub;

              // Date.now returns time in miliseconds and is converted to seconds
              if (exp < Date.now() / 1000) {
                const refresh_token = resp.data.refresh_token
                
                axios.post(`${grantURL}`, `grant_type=refresh_token&refresh_token=${refresh_token}`, { headers: { 'StoreId': storeId, 'Content-Type': 'application/x-www-form-urlencoded' }})
                  .then(refreshResponse => {

                    const accessToken = refreshResponse.data.access_token;
                    const data = jwt_decode(accessToken);
                    console.log(data)
                    
                    const sub = data.sub;

                    auth.authData.sub = sub;

                    this.setState({ isLoading: false });

                    auth.authData.access_token = accessToken;
                    auth.storeAuth();
                    this.props.history.push("/profile");

                  });
              } else {
                const accessToken = resp.data.access_token;
                const data = jwt_decode(accessToken);
                const sub = data.sub;

                auth.authData.sub = sub;

                this.setState({ isLoading: false });
                auth.authData.access_token = accessToken;
                auth.storeAuth();

                this.props.history.push("/profile");
              }
            }

          })
          .catch(err => {

            this.setState({ isLoggedIn: false, isLoading: false });

            if (Object.keys(err).indexOf('response') === -1) {
              console.log(err);
              return;
            }

            //Get the error code 6xx from the custom error object
            const status = err.response.data.error;
            //console.log(err.response.data)
            //console.log(err);
            //const status = 0;

            switch (status) {
              case "600":
              case "603":
                this.setState({
                  errorMessage: "Can't authenticate. MSISDN not valid."
                })
                break;
              case "604":
                // Call registerUser function to register user
                this.registerUser(auth, storeId);
                break;
              default: console.log(err);
            }
          });
      })
  }

  registerUser = (auth, storeId) => {
    const number = auth.authData.phone.number;
    const msisdn = number.substring(1, number.length);

    const registerData = {
      Msisdn: `${msisdn}`,
      Token: auth.authData.token
    }

    // console.log(auth.authData.token);
    //console.log(msisdn)

    axios.post(`${base_services_api}/users/registerbymsisdn`, registerData, { headers: { 'StoreId': storeId } })
      .then(resp => {
        //if register is successfull call login function
        this.loginUser(auth, storeId);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    let profileButton;

    if (this.auth.isAuthenticated()) {
      profileButton = (
        <Link to='/profile' onClick={this.onClick} className="nav-btn">My Subscriptions</Link>
      );
    } else {
      profileButton = (
        <AccountKit
          appId={appId}
          version="v1.1"
          onResponse={this.loginResponse.bind(this)}
          csrf='16132165'
          text="Login"
          loginType='PHONE'
        >
          {p => <button className={this.props.btnClass} {...p}>
            {this.props.btnText}
          </button>}
        </AccountKit>
      );
    }
    return (
      <div>
        {profileButton}

        {
          this.state.errorMessage !== '' &&
          <div className="status-error">
            {this.state.errorMessage}
          </div>
        }
        {
          this.state.isLoading &&
          <div className="loader">
            <div className="container">
              <div className="spinner">
                <div></div><div></div><div></div><div></div>
              </div>
            </div>
          </div>
        }

      </div>
    )
  }
}

const WithFBLogin = withRouter(FBLogin);
export default withLocalize(WithFBLogin);