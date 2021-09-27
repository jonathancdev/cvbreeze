import { React, useState } from "react";
import "./css/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Account,
  Create,
  Contact,
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
  const [sessionActive, setSessionActive] = useState(false);

  //user, authentication, and session functions
  const logUserIn = (obj) => {
    setUser(obj);
    localStorage.setObject("currentUser", obj);
    setSessionActive(true);
  };
  const logUserOut = () => {
    setUser(null);
    setSessionActive(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/">
          <Home
            user={user}
            sessionActive={sessionActive}
            logUserIn={logUserIn}
            logUserOut={logUserOut}
          />
        </Route>
        <Switch>
          <Route path="/create">
            <Create user={user} />
          </Route>
          <Route path="/signin">
            <Signin
              user={user}
              sessionActive={sessionActive}
              logUserIn={logUserIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/signup">
            <Signup
              user={user}
              sessionActive={sessionActive}
              logUserIn={logUserIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/account">
            <Account
              sessionActive={sessionActive}
              user={user}
              logUserIn={logUserIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/contact">
            <Contact
              user={user}
              sessionActive={sessionActive}
              logUserIn={logUserIn}
              logUserOut={logUserOut}
            />
          </Route>
          <Route path="/print">
            <Print />
          </Route>
        </Switch>
        {/* RENDER PRINT PAGE OUTSIDE OF LAYOUT AND STATE TO HIDE OTHER ELEMENTS WON"T BE NECESSARY */}
      </div>
    </BrowserRouter>
  );
}

export default App;
