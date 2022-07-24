import React from "react";
import { useContext, useState, useEffect } from "react";
import { getDisabled } from "../api/apiCalls";
import { userContext } from "../shared/Context";
import BannedUserCard from "./BannedUserCard";

const BannedUserList = (props) => {
  const { user, setUser } = useContext(userContext);
  const { isLoggedIn, nameGlobal, usernameGlobal, passwordGlobal, isAdmin } =
    user;

  const [members, setMembers] = useState([]);

  const getBannedUsers = async () => {
    const response = await getDisabled({
      username: usernameGlobal,
      password: passwordGlobal,
    });
    setMembers(response.data);
  };
  useEffect(() => {
    if (isAdmin) {
      getBannedUsers();
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
              Banned User List{" "}
            </h1>
          </div>

          {members.map((member) => {
            return <BannedUserCard key={member.username} member={member} />;
          })}
        </div>
      )}
    </>
  );
};

export default BannedUserList;
