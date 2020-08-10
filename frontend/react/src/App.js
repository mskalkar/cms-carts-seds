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

    Auth.currentUserInfo().then(res=> {
      console.log(res)
    })

  Auth.currentSession().then(res=>{
    console.log(res)
    let accessToken = res.getAccessToken()
    let jwt = accessToken.getJwtToken()
    //You can print them to see the full objects
    console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
    console.log(`myJwt: ${jwt}`)
    // fetch("https://cmscartsseds3e4e2271-3e4e2271-dev.auth.us-east-1.amazoncognito.com/oauth2/userInfo", {
    //   method: "GET",
    //   headers: {
    //     "Authorization": `Bearer ${accessToken}`
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data));
  });

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
