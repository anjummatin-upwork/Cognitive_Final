import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { UserContext } from "../Context/Context";
import { withFirebase } from "../Firebase";
import { SignUpLink } from "../SignUp";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import "./SignIn.css";
import Footer from "../Footer/Footer";
const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;
    let { setUser } = this.context;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((response) => {
        // if you want userData save to localStorage please use below function
        localStorage.setItem("user", JSON.stringify(response.user.uid));
        setUser(response.user);
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(
          `/Home`
        );
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  static contextType = UserContext;

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";

    return (
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={6} className="logIn-left-column"></Grid>
        <Grid item xs={12} md={6} className="logIn-right-column">
          <Box>
            <Typography variant="h3" className="logIn-header">
              Hi there,
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: "#032e54",
                fontWeight: "400",
                marginTop: "15px",
              }}
            >
              {" "}
              Please log in to access to your Genetically DNA report.{" "}
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: "#032e54",
                fontWeight: "400",
                marginTop: "11px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              You can also access with{" "}
              <span>
                {" "}
                <FaFacebook
                  style={{
                    fontSize: "28px",
                    marginLeft: "6px",
                    cursor: "pointer",
                  }}
                />{" "}
                <AiFillGoogleCircle
                  style={{
                    fontSize: "31px",
                    marginLeft: "5px",
                    cursor: "pointer",
                  }}
                />{" "}
              </span>{" "}
            </Typography>
            <form
              onSubmit={this.onSubmit}
              style={{
                margin: "0 auto",
                marginTop: "40px",
                width: "90%",
                textAlign: "right",
              }}
            >
              <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                className="logIn-input-field"
              />

              <input
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                className="logIn-input-field password"
              />
              <Typography
                variant="caption"
                style={{
                  display: "block",
                  textAlign: "right",
                  marginTop: "7px",
                }}
              >
                <SignUpLink />
              </Typography>

              <Button
                variant="contained"
                disabled={isInvalid}
                type="submit"
                className="login-button"
              >
                Sign In
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
            </form>
          </Box>
        </Grid>
        <Footer />
      </Grid>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
