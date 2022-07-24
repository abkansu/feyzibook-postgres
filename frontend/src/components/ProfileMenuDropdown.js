import { paste } from "@testing-library/user-event/dist/paste";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { unbanUser } from "../api/apiCalls";
import { userContext } from "../shared/Context";

const ProfileMenuDropdown = (props) => {
  const { members, label } = props;

  const [isOn, setIsOn] = useState(false);

  const { user, setUser } = useContext(userContext);
  const { iLoggedIn, isAdmin, usernameGlobal, passwordGlobal } = user;

  const [enabled, setEnabled] = useState(isAdmin && label === "Banned users");

  const params = useParams();
  const { username: currentPath } = params;

  let value = false;

  const onClickDropdown = () => {
    setIsOn(!isOn);
  };

  const onClickUnban = async (username) => {
    const creds = {
      username: usernameGlobal,
      password: passwordGlobal,
    };
    try {
      const response = await unbanUser(username, creds);
    } catch (error) {}
  };

  return (
    <div className="card-header mt-2" onClick={onClickDropdown}>
      <button
        className="btn btn-secondary dropdown-toggle"
        onClick={onClickDropdown}
        style={{ color: "#657786" }}
      >
        <p style={{ color: "white", height: 0.2 + "rem" }}>{label}</p>
      </button>
      <div className="mt-2 ">
        {isOn &&
          members.map((member) => {
            return (
              <div className="card body mb-2" key={member.username}>
                <Link
                  className={isAdmin ? "disabled" : ""}
                  style={{ backgroundColor: "#192734", borderColor: "#192734" }}
                  to={`/member/${member.username}`}
                >
                  <p
                    style={{ height: 1 + "rem" }}
                  >{`${member.name}@${member.username}`}</p>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProfileMenuDropdown;

// {
//   /* {enabled && (
//                   <button
//                     className="btn btn-info"
//                     style={{ marginLeft: 2 + "rem" }}
//                     onClick={(event) => onClickUnban(member.username)}
//                   >
//                     Unban user
//                   </button>
//                 )} */
// }
