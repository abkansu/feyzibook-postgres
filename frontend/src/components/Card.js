import React, { useContext, useEffect, useState } from "react";
import ButtonPrimary from "./ButtonPrimary";
import { Link, useParams } from "react-router-dom";
import { userContext, toggleContext } from "../shared/Context";
import { deleteMeeting, joinMeeting, unjoinMeeting } from "../api/apiCalls";
import ProfileMenuDropdown from "./ProfileMenuDropdown";
const Card = (props) => {
  const {
    header,
    context,
    name,
    username,
    id,
    joinedMembers,
    date,
    beginDate,
    endDate,
  } = props;

  const [disabled, setDisabled] = useState(true);
  const [isJoined, setIsJoined] = useState();
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const { user, setUser } = useContext(userContext);
  const { toggle, setToggle } = useContext(toggleContext);
  const { isLoggedIn, nameGlobal, usernameGlobal, passwordGlobal, isAdmin } =
    user;

  const params = useParams();
  const { username: currentPath } = params;

  const isOwner = isLoggedIn && username === usernameGlobal;
  let enableProfileCard = false;

  if (joinedMembers.length != 0) {
    enableProfileCard = true;
  }

  useEffect(() => {
    joinedMembers.map((member) => {
      if (member.username === usernameGlobal) {
        setIsJoined(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsJoined(false);
      setDisabled(true);
    }
  }, [isLoggedIn]);

  const onClickJoin = async () => {
    if (!isLoggedIn) {
      setDisabled(false);
    } else {
      const creds = {
        username: usernameGlobal,
        password: passwordGlobal,
      };
      try {
        setPendingApiCall(true);
        await joinMeeting(id, creds);
        setIsJoined(true);
      } catch (error) {
        console.log(error);
      } finally {
        setPendingApiCall(false);
      }
    }
  };

  const onClickUnjoin = async () => {
    if (!isLoggedIn) {
      setDisabled(false);
    } else {
      const creds = {
        username: usernameGlobal,
        password: passwordGlobal,
      };
      try {
        setPendingApiCall(true);
        await unjoinMeeting(id, creds);
        setIsJoined(false);
      } catch (error) {
        console.log(error);
      } finally {
        setPendingApiCall(false);
      }
    }
  };

  const onClickDelete = async () => {
    const creds = {
      username: usernameGlobal,
      password: passwordGlobal,
    };
    try {
      setPendingApiCall(true);
      await deleteMeeting(id, creds);
      setToggle(!toggle);
    } catch (error) {
      console.log(error);
    } finally {
      setPendingApiCall(false);
    }
  };

  return (
    <div className="card mt-2 text-center">
      <div className="card-header" style={{ backgroundColor: "#192734" }}>
        <div className="d-flex">
          <Link
            className={
              isAdmin || username === currentPath
                ? "btn btn-light disabled "
                : "btn btn-light"
            }
            to={`/member/${username}`}
          >{`${name}@${username}`}</Link>
          {/* )} */}

          <div className="p-2"></div>
          {(isOwner || isAdmin) && (
            <button
              type="button"
              className="btn p-2"
              onClick={onClickDelete}
              disabled={pendingApiCall}
              style={{ backgroundColor: "#D85403" }}
            >
              <p style={{ height: 0.5 + "rem", color: "white" }}>Delete</p>
            </button>
          )}
          <div className="p-2">
            <p
              style={{ height: 0.1 + "rem", color: "white" }}
            >{`Post time : ${date}`}</p>
          </div>
          {/* <div>{date}</div> */}
        </div>
      </div>

      <div className="card-body" style={{ backgroundColor: "#657786" }}>
        <h5 className="card-title" style={{ color: "white" }}>
          {header}
        </h5>
        <p className="card-text" style={{ color: "white" }}>
          {context}
        </p>
        {!isAdmin && (
          <ButtonPrimary
            text="Join event"
            onClick={onClickJoin}
            disabled={isJoined || isOwner || pendingApiCall}
          />
        )}
        {isJoined && (
          <button
            type="button"
            className="btn"
            onClick={onClickUnjoin}
            disabled={pendingApiCall}
            style={{ backgroundColor: "#D85403" }}
          >
            <p style={{ height: 0.6 + "rem", color: "white" }}>Unjoin</p>
          </button>
        )}
        <div className="mt-2">
          <p
            className="card-text"
            style={{ color: "white" }}
          >{`${beginDate} - ${endDate}`}</p>
        </div>
        {!disabled && (
          <div className="alert alert-info mt-2" role="alert">
            To join the event please,
            <Link to={"/login"} className="alert-link">
              login
            </Link>
          </div>
        )}
        {enableProfileCard && (
          <ProfileMenuDropdown members={joinedMembers} label="Joined members" />
        )}
      </div>
    </div>
  );
};

export default Card;
