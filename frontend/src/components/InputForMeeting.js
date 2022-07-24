import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "./Input";
import { useContext } from "react";
import { toggleContext, userContext } from "../shared/Context";
import ButtonPrimary from "./ButtonPrimary";
import { Link } from "react-router-dom";

const InputForMeeting = (props) => {
  const { onChange, onClickPost, disabled, pendingApiCall } = props;
  const { user, setUser } = useContext(userContext);
  const { isLoggedIn, nameGlobal, usernameGlobal, passwordGlobal, isAdmin } =
    user;

  const params = useParams();
  const { username: currentPath } = params;
  let value =
    (currentPath && currentPath === usernameGlobal) ||
    (isLoggedIn && !currentPath);

  return (
    <>
      <div></div>

      {value && !isAdmin && (
        <div className="card mt-2">
          <div className="card-header" style={{ backgroundColor: "#192734" }}>
            <h3 style={{ color: "white" }}>New meeting</h3>
          </div>

          <div className="card-body" style={{ backgroundColor: "#657786" }}>
            <div className="form-group">
              <Input
                label="Header"
                type="text"
                name="header"
                onChange={onChange}
              />
              <Input
                label="Context"
                type="text"
                name="context"
                onChange={onChange}
              />
              <Input
                label="Begin date"
                type="date"
                name="beginDate"
                onChange={onChange}
              />
              <Input
                label="End date"
                type="date"
                name="endDate"
                onChange={onChange}
              />
            </div>
            <div className="mt-2 text-center">
              <ButtonPrimary
                text="Post"
                onClick={onClickPost}
                disabled={pendingApiCall}
              />
            </div>

            {!disabled && (
              <div className="alert alert-info mt-2 text-center" role="alert">
                Beginning date can not be before end date
                {/* <Link to={"/login"} className="alert-link">
                  login
                </Link> */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InputForMeeting;
