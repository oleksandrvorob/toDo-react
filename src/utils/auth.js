import axios from "axios";

const storeId = process.env.REACT_APP_STOREID;
const base_services_api = process.env.REACT_APP_SERVICES_API_BASE;

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + (h * 60 * 60 * 1000));
  return this;
}

export default class Auth {

  storeAuth() {
    const date = new Date();
    date.addHours(24);
    document.cookie = `authData=${JSON.stringify(this.authData)}; expires=${date}`;
  }

  loadAuth() {
    var decodedCookie = decodeURIComponent(document.cookie);
    var result = decodedCookie.match(new RegExp('authData=([^;]+)'));

    if (result === null) {
      this.authData = null;
      return;
    }
 
    this.authData = JSON.parse(result[1]);
  }

  async loadSubscriptions(){
    try {
      const gt =  axios.get(`${base_services_api}/users/${this.authData.sub}/subscriptions/`, { headers: { 'StoreId': storeId, 'Authorization': `Bearer ${this.authData.access_token}`}})   
      return gt;
    } catch(err) {
      return null;
    }
  }

  isAuthenticated() {
    return this.authData !== null && this.authData !== undefined
  }

  logout() {
    document.cookie = "authData=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    this.authData = null;
  }

}