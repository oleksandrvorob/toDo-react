import { Component } from "react";

class ScrollTop extends Component {
   componentDidMount() {
     window.scrollTo(0, 0);
   }
 
   render() {
     return null;
   }
 }

export default ScrollTop;