import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import TopBar from "./components/TopBar";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  useParams,
} from "react-router-dom";
import UserPage from "./pages/UserPage";
import { userContext, toggleContext } from "./shared/Context";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    nameGlobal: undefined,
    usernameGlobal: undefined,
    passwordGlobal: undefined,
    isAdmin: undefined,
  });

  const [toggle, setToggle] = useState(false);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const valueT = useMemo(() => ({ toggle, setToggle }), [toggle, setToggle]);

  // try {
  //   setUser({
  //     isLoggedIn: window.localStorage.getItem("isLoggedIn"),
  //     nameGlobal: window.localStorage.getItem("nameGlobal"),
  //     usernameGlobal: window.localStorage.getItem("usernameGlobal"),
  //     passwordGlobal: window.localStorage.getItem("passwordGlobal"),
  //     isAdmin: window.localStorage.getItem("isAdmin"),
  //   });
  // } catch (error) {
  //   console.log(error);
  // }

  useEffect(() => {
    console.log("here");
    try {
      setUser({
        isLoggedIn: window.localStorage.getItem("isLoggedIn") === "true",
        nameGlobal: window.localStorage.getItem("nameGlobal"),
        usernameGlobal: window.localStorage.getItem("usernameGlobal"),
        passwordGlobal: window.localStorage.getItem("passwordGlobal"),
        isAdmin: window.localStorage.getItem("isAdmin") === "true",
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const { isLoggedIn } = user;
  return (
    <div>
      <toggleContext.Provider value={valueT}>
        <userContext.Provider value={value}>
          <Router>
            <div className="shadow-sm">
              <TopBar />
            </div>

            <Switch>
              {!user.isAdmin && <Route exact path="/" component={HomePage} />}
              {!isLoggedIn && <Route path="/login" component={LoginPage} />}
              {!isLoggedIn && <Route path="/signup" component={SignupPage} />}
              <Route path="/member/:username" component={UserPage} />
              <Redirect
                to={user.isAdmin ? `/member/${user.usernameGlobal}` : "/"}
              />
            </Switch>
          </Router>
        </userContext.Provider>
      </toggleContext.Provider>
    </div>
  );
}

export default App;
