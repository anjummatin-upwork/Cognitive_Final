import React from "react";
import { useState } from "react";
import database from "../firedb";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MaterialButton from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./account.css";

const defaultValues = {
  firstName: "",
  lastName: "",
  phone: "",
  dateOfBirth: "",
  email: "",
  password: "",
  address: "",
};

function Account() {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    database
      .ref("Users")
      .push({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        phone: formValues.phone,
        dateOfBirth: formValues.dateOfBirth,
        email: formValues.email,
        password: formValues.password,
        address: formValues.address,
      })
      .catch(alert);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
          <Typography variant="h2" component="h2">
            Profile
          </Typography>
          <Typography variant="h6" component="h2">
            Create your personal and account information.
          </Typography>
        </Grid>
        <Grid container alignItems="left" justify="center" m={2} pt={3}>
          <Grid item xs={3}>
            <Typography variant="h5" component="h2">
              Personal
            </Typography>
            <Grid item>
              <TextField
                id="firstName-input"
                name="firstName"
                label="First Name"
                type="text"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="lastName-input"
                name="lastName"
                label="Last Name"
                type="text"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="phone-input"
                name="phone"
                label="Phone"
                type="text"
                value={formValues.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="dob-input"
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                value={formValues.dateOfBirth}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="address-input"
                name="address"
                label="Address"
                type="text"
                value={formValues.address}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5" component="h2">
              Account
            </Typography>
            <Grid item>
              <TextField
                id="email-input"
                name="email"
                label="Email"
                type="text"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password-input"
                name="password"
                label="Password"
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box textAlign="center">
          <MaterialButton
            variant="contained"
            color="primary"
            type="submit"
            id="submitButton"
            style={{ backgroundColor: "#032E54", color: "#FFFFFF" }}
          >
            Submit
          </MaterialButton>
        </Box>
      </form>
    </>
  );
}

export default Account;
