import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import axios from "axios";
import { signup } from "../api/apiCalls";
import Input from "../components/Input";
import ButtonPrimary from "../components/ButtonPrimary";
import { withApiProgress } from "../shared/apiProgress";

const SignupPage = (props) => {
  const [form, setForm] = useState({
    name: null,
    username: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const onClickSignup = async (event) => {
    event.preventDefault();
    const { name, username, password, passwordRepeat } = form;
    const body = {
      name: name,
      username: username,
      password: password,
      passwordRepeat: passwordRepeat,
    };

    const { history } = props;
    const { push } = history;
    try {
      const response = await signup(body);
      push("/login");
    } catch (error) {
      setErrors(error.response.data.errors);
      console.log(error);
    } finally {
    }
  };

  const {
    username: usernameError,
    name: nameError,
    password: passwordError,
    passwordRepeat: passwordRepeatError,
  } = errors;
  const { pendingApiCall } = props;
  return (
    <div
      className="container shadow"
      style={{
        width: 30 + "rem",
        marginTop: 7 + "rem",
        backgroundColor: "#657786",
        borderRadius: 10 + "px",
      }}
    >
      <form>
        <Stack direction="vertical" gap={3}>
          <h1 className="text-center" style={{ color: "white" }}>
            Sign up
          </h1>
          <Input
            label="Name"
            name="name"
            error={nameError}
            onChange={onChange}
            type="text"
          />
          <Input
            label="Username"
            name="username"
            error={usernameError}
            onChange={onChange}
            type="text"
          />
          <Input
            label="Password"
            name="password"
            error={passwordError}
            onChange={onChange}
            type="password"
          />
          <Input
            label="Password Repeat"
            name="passwordRepeat"
            error={passwordRepeatError}
            onChange={onChange}
            type="password"
          />

          <div className="text-center" style={{ marginBottom: 0.5 + "rem" }}>
            <ButtonPrimary
              onClick={onClickSignup}
              disabled={pendingApiCall}
              text="Sign up"
            />
          </div>
        </Stack>
      </form>
    </div>
  );
};

const SignupPageWithApiProgress = withApiProgress(
  SignupPage,
  "/api/1.0/member/signup"
);
export default SignupPageWithApiProgress;

/*
<div className="form-group">
              <label>Name</label>
              <input
                name="name"
                className={name ? "form-control is-invalid" : "form-control"}
                onChange={this.onChange}
              />
              <div className="invalid-feedback">{name}</div>
            </div>

<div className="form-group">
              <label>Username</label>
              <input
                name="username"
                className={
                  username ? "form-control is-invalid" : "form-control"
                }
                onChange={this.onChange}
              />
              <div className="invalid-feedback">{username}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                className={
                  password ? "form-control is-invalid" : "form-control"
                }
                type={"password"}
                onChange={this.onChange}
              />
              <div className="invalid-feedback">{password}</div>
            </div>
            <div className="form-group">
              <label>Password Repeat</label>
              <input
                name="passwordRepeat"
                className={
                  passwordRepeat ? "form-control is-invalid" : "form-control"
                }
                type={"password"}
                onChange={this.onChange}
              />
              <div className="invalid-feedback">{passwordRepeat}</div>
            </div>
*/

// class SignupPage extends React.Component {
//   state = {
//     name: undefined,
//     username: undefined,
//     password: undefined,
//     passwordRepeat: undefined,
//     errors: {},
//   };

//   onChange = (event) => {
//     event.preventDefault();
//     const { name, value } = event.target;
//     const errors = { ...this.state.errors };
//     errors[name] = undefined;
//     this.setState({
//       [name]: value,
//       errors: errors,
//     });
//   };

//   onClickSignup = async (event) => {
//     event.preventDefault();
//     const { name, username, password, passwordRepeat } = this.state;
//     const body = {
//       name: name,
//       username: username,
//       password: password,
//       passwordRepeat: passwordRepeat,
//     };

//     const { push } = this.props.history;
//     try {
//       const response = await signup(body);
//       push("/login");
//     } catch (error) {
//       this.setState({
//         errors: error.response.data.errors,
//       });
//       console.log(error);
//     } finally {
//     }
//   };

//   render() {
//     const { username, name, password, passwordRepeat } = this.state.errors;
//     const { pendingApiCall } = this.props;
//     return (
//       <div className="container">
//         <form>
//           <Stack direction="vertical" gap={3}>
//             <h1 className="text-center">Sign up</h1>
//             <Input
//               label="Name"
//               name="name"
//               error={name}
//               onChange={this.onChange}
//               type="text"
//             />
//             <Input
//               label="Username"
//               name="username"
//               error={username}
//               onChange={this.onChange}
//               type="text"
//             />
//             <Input
//               label="Password"
//               name="password"
//               error={password}
//               onChange={this.onChange}
//               type="password"
//             />
//             <Input
//               label="Password Repeat"
//               name="passwordRepeat"
//               error={passwordRepeat}
//               onChange={this.onChange}
//               type="password"
//             />

//             <div className="text-center">
//               <ButtonPrimary
//                 onClick={this.onClickSignup}
//                 disabled={pendingApiCall}
//                 text="Sign up"
//               />
//             </div>
//           </Stack>
//         </form>
//       </div>
//     );
//   }
// }
