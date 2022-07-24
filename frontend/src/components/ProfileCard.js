import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { banUser, deleteUser, editUser, getDisabled } from "../api/apiCalls";
import { userContext, toggleContext } from "../shared/Context";
import { useParams } from "react-router-dom";
import Input from "./Input";
import ProfileMenuDropdown from "./ProfileMenuDropdown";

const ProfileCard = (props) => {
  const { user, setUser } = useContext(userContext);

  const [form, setForm] = useState({
    name: null,
    username: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const { isLoggedIn, nameGlobal, usernameGlobal, passwordGlobal, isAdmin } =
    user;
  const params = useParams();
  const { username: currentPath } = params;

  let canBan = isAdmin && currentPath !== usernameGlobal;

  const [inEditMode, setInEditMode] = useState(false);
  const [disabledMembers, setDisabledMembers] = useState([]);

  const { name, username } = props;

  let value = false;
  if (isLoggedIn && usernameGlobal === currentPath) {
    value = true;
  }

  const inAdminPage = isAdmin && usernameGlobal === currentPath;

  useEffect(() => {
    setErrors({});
  }, [inEditMode]);

  useEffect(() => {
    if (inAdminPage) {
      const getDisabledMembers = async () => {
        const creds = {
          username: usernameGlobal,
          password: passwordGlobal,
        };
        try {
          const response = await getDisabled(creds);
          setDisabledMembers(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getDisabledMembers();
    }
  }, []);

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const onClickDeleteUser = async () => {
    if (isLoggedIn) {
      const creds = {
        username: usernameGlobal,
        password: passwordGlobal,
      };
      try {
        setPendingApiCall(true);
        await deleteUser(creds);
        setUser({
          isLoggedIn: false,
          nameGlobal: undefined,
          usernameGlobal: undefined,
          passwordGlobal: undefined,
          isAdmin: undefined,
        });
      } catch (error) {
        console.log(error.response.data.trace);
      } finally {
        setPendingApiCall(false);
      }
    }
  };

  const onClickSave = async (event) => {
    event.preventDefault();
    const { name, username, password, passwordRepeat } = form;
    const body = {
      name: name,
      username: username,
      password: password,
      passwordRepeat: passwordRepeat,
    };

    const creds = {
      username: usernameGlobal,
      password: passwordGlobal,
    };

    try {
      setPendingApiCall(true);
      const response = await editUser(body, creds);
      setInEditMode(false);
      setUser({
        isLoggedIn: true,
        nameGlobal: name,
        usernameGlobal: username,
        passwordGlobal: password,
        isAdmin: isAdmin,
      });
    } catch (error) {
      setErrors(error.response.data.errors);
      console.log(error);
    } finally {
      setPendingApiCall(false);
    }
  };

  const onClickBan = async () => {
    const creds = {
      username: usernameGlobal,
      password: passwordGlobal,
    };
    try {
      setPendingApiCall(true);
      const response = await banUser(username, creds);
    } catch (error) {
    } finally {
      setPendingApiCall(false);
    }
  };

  const {
    username: usernameError,
    name: nameError,
    password: passwordError,
    passwordRepeat: passwordRepeatError,
  } = errors;
  return (
    <div className="card">
      <div
        className="card-body text-center"
        style={{ backgroundColor: "#657786" }}
      >
        <h5
          className="card-title "
          style={{ color: "white" }}
        >{`${name}@${username}`}</h5>

        {canBan && (
          <div className="mt-2" style={{ backgroundColor: "#F0A04B" }}>
            <Link
              type="button"
              className={
                pendingApiCall ? "btn btn-danger disabled" : "btn btn-danger"
              }
              onClick={onClickBan}
              to="/"
              style={{ backgroundColor: "#2D2D2D" }}
            >
              Ban User
            </Link>
          </div>
        )}
        {value && (
          <>
            <div className="mt-2">
              <div>
                <Link
                  type="button"
                  className={pendingApiCall ? "btn  disabled" : "btn "}
                  to="/"
                  onClick={onClickDeleteUser}
                  style={{ backgroundColor: "#2D2D2D" }}
                >
                  <p style={{ height: 0.5 + "rem", color: "white" }}>
                    Delete User
                  </p>
                </Link>
              </div>

              {!inEditMode && (
                <div className="mt-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setInEditMode(true)}
                    disabled={pendingApiCall}
                  >
                    Edit User
                  </button>
                </div>
              )}

              {inEditMode && (
                <div
                  className="text-center mt-2"
                  style={{
                    overflow: "hidden",
                    overflowY: "scroll",
                    height: 11 + "rem",
                  }}
                >
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    onChange={onChange}
                    error={nameError}
                  />
                  <Input
                    label="Username"
                    type="text"
                    name="username"
                    onChange={onChange}
                    error={usernameError}
                  />
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    onChange={onChange}
                    error={passwordError}
                  />
                  <Input
                    label="Password Repeat"
                    type="password"
                    name="passwordRepeat"
                    onChange={onChange}
                    error={passwordRepeatError}
                  />
                  <div className="mt-2 mb-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={onClickSave}
                      disabled={pendingApiCall}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => setInEditMode(false)}
                      style={{ backgroundColor: "#D85403" }}
                    >
                      <p style={{ height: 0.6 + "rem", color: "black" }}>
                        Cancel
                      </p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* {disabledMembers && inAdminPage && (
          <ProfileMenuDropdown members={disabledMembers} label="Banned users" />
        )} */}
      </div>
    </div>
  );
};

export default ProfileCard;
