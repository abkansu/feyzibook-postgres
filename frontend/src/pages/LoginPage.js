import React, { useState, useEffect, useContext } from "react";

import { Stack } from "react-bootstrap";
import Input from "../components/Input";

import { login } from "../api/apiCalls";
import ButtonPrimary from "../components/ButtonPrimary";
import { withApiProgress } from "../shared/apiProgress";
import { userContext } from "../shared/Context";

const LoginPage = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  // const dispatch = useDispatch();

  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();
    const creds = {
      username: username,
      password: password,
    };

    setError(null);

    const { history } = props;
    const { push } = history;

    try {
      const response = await login(creds);
      let isAdmin = false;
      if (response.data.role === "ADMIN") {
        isAdmin = true;
      }
      setUser({
        isLoggedIn: true,
        nameGlobal: response.data.name,
        usernameGlobal: username,
        passwordGlobal: password,
        isAdmin: isAdmin,
      });
      window.localStorage.setItem("isLoggedIn", true);
      window.localStorage.setItem("nameGlobal", response.data.name);
      window.localStorage.setItem("usernameGlobal", username);
      window.localStorage.setItem("passwordGlobal", password);
      window.localStorage.setItem("isAdmin", isAdmin);
      if (isAdmin) {
        push(`/member/${response.data.username}`);
      } else {
        push("/");
      }
    } catch (apiError) {
      console.log(apiError);
      setError(apiError.response.data.message);
    } finally {
    }
  };

  // const pendingApiCall = useApiProgress("post", "/api/1.0/auth");
  const { pendingApiCall } = props;
  return (
    <div
      className="container shadow"
      style={{
        width: 30 + "rem",
        marginTop: 10 + "rem",
        backgroundColor: "#657786",
        borderRadius: 10 + "px",
      }}
    >
      <form>
        <Stack direction="vertical" gap={3}>
          <h1 className="text-center" style={{ color: "white" }}>
            Login
          </h1>
          <Input
            label="Username"
            name="username"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="text-center" style={{ marginBottom: 0.5 + "rem" }}>
            <ButtonPrimary
              onClick={onClickLogin}
              disabled={pendingApiCall}
              text="Sign in"
            />
          </div>
        </Stack>
      </form>
    </div>
  );
};

const LoginPageWithApiProgress = withApiProgress(LoginPage, "api/1.0/auth");
export default LoginPageWithApiProgress;
