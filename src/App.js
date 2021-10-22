import { React, useState, useEffect } from "react";
import "./css/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import checkCompletedSections from "./utilities/checkCompletedSections";
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
  const [sessionActive, setSessionActive] = useState(
    storageKeys.includes("currentUser")
  );

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
  const [completedSections, setCompletedSections] = useState({});
  const [incomplete, setIncomplete] = useState(true);
  const updateCompletedSections = () => {
    //SAVESECTION IN EACH SECTION CHECKS ALL SECTION STORAGE MEETS REQS AND
    //IN SOME COMPONENTS ALSO IN DELETE FUNCTION
    //PASSES OBJ BACK TO UPDATE STATE HERE
    const obj = checkCompletedSections();
    setCompletedSections({ ...obj });
  };
  const resetCompletedSections = () => {
    setCompletedSections({
      photo: false,
      profile: false,
      workExperience: false,
      educationHistory: false,
      skills: false,
      contact: false,
    });
  };

  const logUserIn = (obj) => {
    setUser({ ...obj });
    localStorage.setObject("currentUser", obj);
    setSessionActive(true);
  };
  const logUserOut = () => {
    resetCompletedSections();
    setUser(null);
    setSessionActive(false);
    localStorage.removeItem("currentUser");
  };
  useEffect(() => {
    setIncomplete(
      Object.keys(completedSections).some((key) => !completedSections[key])
    );
  }, [completedSections]);

  console.log(window.innerHeight);
  console.log(window.innerWidth);
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
              openConfirm={openConfirm}
              completedSections={completedSections}
              updateCompletedSections={updateCompletedSections}
              incomplete={incomplete}
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
          {sessionActive ? (
            <Route path={"/" + user.userId + "/print"}>
              <Print user={user} />
            </Route>
          ) : null}
        </Switch>
        {/* RENDER PRINT PAGE OUTSIDE OF LAYOUT AND STATE TO HIDE OTHER ELEMENTS WON"T BE NECESSARY */}
      </div>
    </BrowserRouter>
  );
}

export default App;
