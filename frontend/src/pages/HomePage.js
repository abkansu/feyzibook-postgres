import React, { useContext } from "react";
import { Stack } from "react-bootstrap";
import SignupPage from "./SignupPage";
import Card from "../components/Card";
import CardList from "../components/CardList";
import { userContext } from "../shared/Context";

export const HomePage = (props) => {
  const { user } = useContext(userContext);
  const { isLoggedIn } = user;

  return (
    <div className="container">
      <CardList />
      {/* {
        <Card
          name="No Context"
          username="No Context"
          header="No Context"
          context="No Context"
        />
      } */}
      {/* {!isLoggedIn && <SignupPage {...props} />} */}
    </div>
  );
};

export default HomePage;

/*
<form>
          <Stack direction="vertical" gap={3}>
            <h1 className="text-center">Sign up</h1>
            <div className="form-group">
              <label>Username</label>
              <input className="form-control" />
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input className="form-control" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="form-control" type={"password"} />
            </div>
            <div className="form-group">
              <label>Password Repeat</label>
              <input className="form-control" type={"password"} />
            </div>
            <div className="text-center">
              <button className="btn btn-primary">Sign up</button>
            </div>
          </Stack>
        </form>
*/
