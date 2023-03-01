import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import LogIn from "./components/Auth/LogIn";
import Application from "./components/Application";
import NavBar from "./components/navBar";
import { AuthProvider } from "./components/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route path="/Application/users/:id">
                  <Application />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;