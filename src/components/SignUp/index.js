import { Box, Button, Typography } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { UserContext } from "../Context/Context";
import { withFirebase } from "../Firebase";
import Footer from "../Footer/Footer";
import "./SignUp.css";
const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  static contextType = UserContext;

  onSubmit = (event) => {
    const { username, email, passwordOne } = this.state;
    let { setUser } = this.context;
    let { from } = this.props.location?.state?.from?.pathname || {
      from: { pathname: ROUTES.Home },
    };
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((response) => {
        // if you want userData save to localStorage please use below function

        localStorage.setItem("user", JSON.stringify(response.user.uid));

        setUser(response.user);
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(from);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    console.log("location", this.props);
    return (
      <>
        <Box
          style={{
            width: "100%",
            height: "100vh",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              style={{ color: "#032e54", fontFamily: "Chivo, sans-serif" }}
            >
              Please Sign Up
            </Typography>
            <Form
              onSubmit={this.onSubmit}
              className="signUp-form"
              style={{
                maxWidth: "320px",
                marginTop: "40px",
                textAlign: "right",
              }}
            >
              <input
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
                className="signUp-input-field"
              />
              <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                className="signUp-input-field"
              />
              <input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                className="signUp-input-field"
              />
              <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
                className="signUp-input-field"
              />
              <Typography
                variant="caption"
                style={{
                  display: "block",
                  textAlign: "right",
                  marginTop: "7px",
                  color: "#032e54",
                }}
              >
                Already have an account?{" "}
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
              </Typography>

              <Button
                variant="contained"
                className="signup-button"
                disabled={isInvalid}
                type="submit"
              >
                Sign Up
              </Button>
              {error && (
                <Typography
                  variant="caption"
                  style={{
                    display: "block",
                    textAlign: "left",
                    color: "red",
                    marginTop: "10px",
                  }}
                >
                  {error.message}
                </Typography>
              )}
            </Form>
          </Box>
        </Box>
        <Footer />
      </>
    );
  }
}

const SignUpLink = () => (
  <Typography variant="caption" style={{ color: "#032e54" }}>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </Typography>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
