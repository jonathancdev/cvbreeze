
import Layout from "./components/layout/Layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Account, Create, Help, Home, Signin, Signup } from './components/pages'
function App() {
  return (
<BrowserRouter>
    <div className="App">
    <Layout>
<Route exact path="/">
              <Home/>
        </Route>
        <Switch> 
            <Route path="/create">
              <Create/>
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/help">
              <Help />
            </Route>
            <Route/>
          </Switch>
    </Layout>
    </div>
</BrowserRouter>
  );
}

export default App;
