import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { toggleContext, userContext } from "../shared/Context";

const TopBar = () => {
  const { user, setUser } = useContext(userContext);
  const { toggle, setToggle } = useContext(toggleContext);

  const { isLoggedIn, nameGlobal, usernameGlobal, passwordGlobal, isAdmin } =
    user;

  const onClickLogout = () => {
    setUser({
      isLoggedIn: false,
      nameGlobal: undefined,
      usernameGlobal: undefined,
      passwordGlobal: undefined,
      isAdmin: false,
    });
    window.localStorage.setItem("isLoggedIn", false);
    window.localStorage.setItem("nameGlobal", undefined);
    window.localStorage.setItem("usernameGlobal", undefined);
    window.localStorage.setItem("passwordGlobal", undefined);
    window.localStorage.setItem("isAdmin", false);
    setToggle(!toggle);
  };

  let links = (
    <>
      <Link className="nav-link" to="/login" style={{ float: "left" }}>
        <p style={{ color: "white" }}>Login</p>
      </Link>
      <Link className="nav-link" to="/signup" style={{ float: "right" }}>
        <p style={{ color: "white" }}>Signup</p>
      </Link>
    </>
  );
  if (isLoggedIn) {
    links = (
      <>
        <Link
          className="nav-link"
          to={`/member/${usernameGlobal}`}
          style={{ float: "left" }}
        >
          <p style={{ color: "white" }}>{usernameGlobal}</p>
        </Link>
        <Link
          className="nav-link"
          to="/"
          onClick={onClickLogout}
          style={{ float: "right" }}
        >
          <p style={{ color: "white" }}>Logout</p>
        </Link>
      </>
    );
  }

  return (
    <div className="navbar">
      <Link
        className="navbar-brand"
        to={isAdmin ? `/member/${usernameGlobal}` : "/"}
        style={{
          color: "white",
          marginLeft: 2 + "rem",
          fontFamily: "Oswald",
          fontSize: "x-large",
        }}
      >
        feyzibook
      </Link>
      <div style={{ float: "right" }}>{links}</div>
    </div>
  );
};

export default TopBar;

{
  /* <Navbar bg="light" expand="lg">
<Container fluid>
  <Link
    className="navbar-brand"
    to={isAdmin ? `/member/${usernameGlobal}` : "/"}
  >
    feyzibook
  </Link>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="me-auto my-2 my-md-0"
      style={{ maxHeight: "100px" }}
      navbarScroll
    >
      {links}
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar> */
}
