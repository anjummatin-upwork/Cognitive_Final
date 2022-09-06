import React from "react";
import blog from "../Files/blog.png";
import about1 from "../Files/about1.png";
import about2 from "../Files/about2.png";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import MaterialCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import MaterialButton from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./about.css";

import Footer from "../Footer/Footer";

const About = () => (
  <div>
    <div className="card mb-3" style={{ width: "100%" }}>
      <div className="row no-gutters">
        <div class="pic1">
          <img src={about1}></img>
          <div class="pic2">
            <img src={about2}></img>
          </div>
        </div>
        <div className="col-md-4 writing float-right ">
          <div className="card-body">
            <h3 className="card-title">About Genetically</h3>
            <p className="card-text">
              Cursus in hac habitasse platea dictumst quisque sagittis purus.
              Tortor consequat id porta nibh venenatis cras sed felis eget. Dis
              parturient montes nascetur ridiculus. Cursus in hac habitasse
              platea dictumst quisque sagittis purus. Tortor consequat id porta
              nibh venenatis cras sed felis eget. Dis parturient montes nascetur
              ridiculus. Cursus in hac habitasse platea dictumst quisque
              sagittis purus. Tortor consequat id porta nibh venenatis cras sed
              felis eget. Dis parturient montes nascetur ridiculus. Cursus in
              hac habitasse platea dictumst quisque sagittis purus. Tortor
              consequat id porta nibh venenatis cras sed felis eget. Dis
              parturient montes nascetur ridiculus.Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </div>
    {/**Blog*/}
    <MaterialCard sx={{ padding: 1 }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" image={blog} />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            padding: "50px",
            color: "#FFFFFF",
          }}
        >
          <Typography variant="h2">Keep posted with our blog!</Typography>
          <Typography variant="body2">
            Quam elementum pulvinar etiam non quam lacus suspendisse. Duis at
            tellus at urna condimentum mattis pellentesque. Pharetra et ultrices
            neque ornare aenean euismod.
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1.5, width: "35ch" },
            }}
            noValidate
            autoComplete="off"
            color="#FFFFFF"
          >
            <TextField
              id="email"
              label="Type your email"
              color="primary"
              focused
            />
            <MaterialButton
              id="subscribeButton"
              style={{ backgroundColor: "#036AC3", color: "#FFFFFF" }}
            >
              Subscribe
            </MaterialButton>
          </Box>
        </Box>
      </Box>
    </MaterialCard>

    <Footer />
  </div>
);

export default About;
