import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CardList from "../components/CardList";
import ProfileCard from "../components/ProfileCard";
import { getUser } from "../api/apiCalls";
import UserList from "../components/UserList";
import { userContext } from "../shared/Context";
import BannedUserList from "../components/BannedUserList";

const UserPage = (props) => {
  const params = useParams();
  const { username } = params;

  const [name, setName] = useState();

  const { user, setUser } = useContext(userContext);
  const { isLoggedIn, nameGlobal, usernameGlobal, passwordGlobal, isAdmin } =
    user;

  const getUserforPage = async () => {
    const { history } = props;
    const { push } = history;
    try {
      const response = await getUser(username);

      setName(response.data.name);
    } catch (error) {
      push("/");
    }
  };

  getUserforPage();

  return (
    <div className={isAdmin ? "row mt-2" : ""}>
      {isAdmin ? (
        <div
          style={{
            width: 50 + "rem",
            marginLeft: 2 + "rem",
            borderRadius: 10 + "px",
            height: 18 + "rem",
            backgroundColor: "#22303C",
          }}
        >
          <ProfileCard username={username} name={name} />
        </div>
      ) : (
        <ProfileCard username={username} name={name} />
      )}

      {isAdmin && usernameGlobal == username && (
        <>
          <div
            style={{
              width: 50 + "rem",
              marginLeft: 2 + "rem",
              borderRadius: 10 + "px",
              height: 18 + "rem",
              overflow: "hidden",
              overflowY: "scroll",
              backgroundColor: "#22303C",
            }}
          >
            <BannedUserList />
          </div>
          <div
            className="column"
            style={{
              width: 50 + "rem",
              marginLeft: 2 + "rem",
              borderRadius: 10 + "px",
              height: 25 + "rem",
              overflow: "hidden",
              overflowY: "scroll",
              backgroundColor: "#22303C",
              marginTop: 2 + "rem",
            }}
          >
            <UserList />
          </div>
        </>
      )}
      {isAdmin ? (
        <div
          className="column"
          style={{
            width: 50 + "rem",
            borderRadius: 20 + "px",
            marginLeft: 2 + "rem",
            height: 25 + "rem",
            overflow: "hidden",
            overflowY: "scroll",
            backgroundColor: "#22303C",
            marginTop: 2 + "rem",
          }}
        >
          <div
            className="card"
            style={{ backgroundColor: "#22303C", borderColor: "white" }}
          >
            <div
              className="card-header"
              style={{
                backgroundColor: "#22303C",
                borderColor: "white",
              }}
            >
              <h1 className="mt-2" style={{ color: "white" }}>
                {" "}
                Meeting List{" "}
              </h1>
            </div>
            <div className="card-body">
              <CardList username={username} />
            </div>
          </div>
        </div>
      ) : (
        <CardList username={username} />
      )}
    </div>
  );
};

export default UserPage;
