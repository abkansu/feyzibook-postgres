import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../shared/Context";
import { unbanUser } from "../api/apiCalls";

const BannedUserCard = (props) => {
  const { member } = props;
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const { user, setUser } = useContext(userContext);
  const { isLoggedIn, nameGlobal, usernameGlobal, passwordGlobal, isAdmin } =
    user;

  const onClickUnBan = async () => {
    const creds = {
      username: usernameGlobal,
      password: passwordGlobal,
    };
    try {
      setPendingApiCall(true);
      const response = await unbanUser(member.username, creds);
    } catch (error) {
    } finally {
      setPendingApiCall(false);
    }
  };
  return (
    <div className="card-body" style={{ backgroundColor: "#657786" }}>
      {/* <div className="card-body">
    <div className="row"> */}
      <div style={{ margin: 1 + "rem" }}>
        <Link
          className="btn btn-light disabled"
          to={`/member/${usernameGlobal}`}
        >{`${member.name}@${member.username}`}</Link>

        <button
          className={
            pendingApiCall ? "btn btn-primary disabled " : "btn btn-primary"
          }
          onClick={onClickUnBan}
          style={{ marginLeft: 2 + "rem" }}
          disabled={pendingApiCall}
        >
          <p style={{ height: 0.5 + "rem", color: "white" }}>Unban User</p>
        </button>
      </div>
      {/* </div>
    </div> */}
    </div>
  );
};

export default BannedUserCard;
