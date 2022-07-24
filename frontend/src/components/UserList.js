import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { userContext } from "../shared/Context";
import { getEnabledUsers } from "../api/apiCalls";
import UserCard from "./UserCard";

const UserList = (props) => {
  const { user, setUser } = useContext(userContext);
  const { isLoggedIn, nameGlobal, usernameGlobal, passwordGlobal, isAdmin } =
    user;

  const [members, setMembers] = useState([]);
  const getAllUsersAdmin = async () => {
    const response = await getEnabledUsers({
      username: usernameGlobal,
      password: passwordGlobal,
    });
    setMembers(response.data);
  };
  useEffect(() => {
    if (isAdmin) {
      getAllUsersAdmin();
    }
  }, []);

  return (
    <>
      <></>
      {members && (
        <div className="card mt-2">
          <div className="card-header" style={{ backgroundColor: "#192734" }}>
            <h1 className="mt-2" style={{ color: "white" }}>
              {" "}
              User List{" "}
            </h1>
          </div>

          {members.map((member) => {
            return <UserCard key={member.username} member={member} />;
          })}
        </div>
      )}
    </>
  );
};

export default UserList;
