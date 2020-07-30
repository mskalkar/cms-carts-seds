import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./App.scss";
import Routes from "./reactRouter";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

function App() {
  let VisibleHeader =
    window.location.pathname.split("/")[1] === "reports" ? null : <Header />;

  let VisibleFooter =
    window.location.pathname.split("/")[1] === "reports" ? null : <Footer />;
  return (
    <div className="App">
      {VisibleHeader}
      <Routes />
      {VisibleFooter}
    </div>
  );
}

// export default App;
export default withAuthenticator(App, true);
