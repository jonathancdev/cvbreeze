import { React, useState } from "react";
import Layout from "./components/layout/Layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Account,
  Create,
  Help,
  Home,
  Print,
  Signin,
  Signup,
} from "./components/pages";
import objectStorage from "./utilities/objectStorage";
function App() {
  const init = () => {
    objectStorage();
  };
  init();

  const storageKeys = Object.keys(localStorage);
  const [user, setUser] = useState(
    storageKeys.includes("currentUser")
      ? localStorage.getObject("currentUser")
      : null
  );

  //user, authentication, and session functions
  const logUserIn = (obj) => {
    setUser(obj);
    localStorage.setObject("currentUser", obj);
  };
  const logUserOut = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Layout logUserOut={logUserOut} user={user}>
          <Route exact path="/">
            <Home user={user} />
          </Route>
          <Switch>
            <Route path="/create">
              <Create user={user} />
            </Route>
            <Route path="/signin">
              <Signin logUserIn={logUserIn} />
            </Route>
            <Route path="/signup">
              <Signup logUserIn={logUserIn} />
            </Route>
            <Route path="/account">
              <Account
                user={user}
                logUserIn={logUserIn}
                logUserOut={logUserOut}
              />
            </Route>
            <Route path="/help">
              <Help />
            </Route>
            <Route path="/print">
              <Print />
            </Route>
          </Switch>
        </Layout>
        {/* RENDER PRINT PAGE OUTSIDE OF LAYOUT AND STATE TO HIDE OTHER ELEMENTS WON"T BE NECESSARY */}
      </div>
    </BrowserRouter>
  );
}

export default App;
