import { React, useState } from "react";
import "./css/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AlertModal from "./components/AlertModal";
import ConfirmModal from "./components/ConfirmModal";
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

  //modal state and update fncs
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [confirmFunctionA, setConfirmFunctionA] = useState(null); //return true
  const [confirmFunctionB, setConfirmFunctionB] = useState(null); //return false

  const closeAlert = () => {
    setAlertOpen(false);
  };
  const openAlert = (message) => {
    setAlertOpen(true);
    setAlertMessage(message);
  };
  const closeConfirm = () => {
    setConfirmOpen(false);
    setConfirmFunctionA(null);
    setConfirmFunctionB(null);
    setConfirmMessage(null);
  };
  const openConfirm = async (message, callbackA, callbackB) => {
    setConfirmFunctionA(callbackA);
    setConfirmFunctionB(callbackB);
    setConfirmOpen(true);
    setConfirmMessage(message);
  };
  const handleConfirm = (bool) => {
    if (bool) {
      confirmFunctionA();
      setConfirmOpen(false);
    } else {
      confirmFunctionB();
      setConfirmOpen(false);
    }
    setConfirmFunctionA(null);
    setConfirmFunctionB(null);
    setConfirmMessage(null);
  };

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
        {alertOpen ? (
          <AlertModal message={alertMessage} closeAlert={closeAlert} />
        ) : null}
        {confirmOpen ? (
          <ConfirmModal
            message={confirmMessage}
            closeConfirm={closeConfirm}
            handleConfirm={handleConfirm}
          />
        ) : null}
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
            <Create
              user={user}
              sessionActive={sessionActive}
              openAlert={openAlert}
            />
          </Route>
          <Route path="/signin">
            <Signin
              user={user}
              sessionActive={sessionActive}
              logUserIn={logUserIn}
              logUserOut={logUserOut}
              openAlert={openAlert}
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
              openConfirm={openConfirm}
              // updateConfirmFunction={updateConfirmFunction}
            />
          </Route>
          <Route path="/contact">
            <Contact
              user={user}
              sessionActive={sessionActive}
              logUserIn={logUserIn}
              logUserOut={logUserOut}
              openAlert={openAlert}
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
