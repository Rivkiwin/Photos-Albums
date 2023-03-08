import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LogIn from "./components/Auth/LogIn";
import Application from "./components/Application";
import NavBar from "./components/navBar";
import { AuthProvider } from "./components/AuthProvider";


function App() {

  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  );
}

export default App;