import React from "react";
import { Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FooterLogo from "../Files/footer1.png";
import { Link } from "react-router-dom";
import { Box, Grid } from "@material-ui/core";
import "./Footer.css";

const Footer = () => {
  window.scrollTo(0, 0);
  return (
    <div className="footer-main-container">
      <Grid
        container
        style={{ width: "90%", margin: "auto", padding: "15px 0" }}
      >
        <Grid
          item
          xs={6}
          sm={5}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="footer-left-column"
        >
          <Typography
            variant="h6"
            color="inherit"
            sx={{ display: "inline-block" }}
          >
            <img src={FooterLogo} alt="logo"></img>
          </Typography>
          <Typography
            variant="caption"
            color="inherit"
            sx={{
              display: "inline-block",
              marginLeft: "5px",
              color: "#545454",
            }}
          >
            @All Rights Reserved.
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={7}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          className="footer-right-column"
        >
          <Link to="/" className="footer-link">
            Company
          </Link>
          <Link to="/Contact" className="footer-link">
            Contact
          </Link>
          <Link to="/Legal" className="footer-link">
            Legal Mentions
          </Link>
          <Box
            sx={{
              width: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <a href="www.google.com" rel="noreferrer noopener">
              <FacebookIcon sx={{ fontSize: 30, color: "#032E54" }} />
            </a>
            <a href="www.google.com" rel="noreferrer noopener">
              <InstagramIcon style={{ fontSize: 30, color: "#032E54" }} />
            </a>
            <a href="www.google.com" rel="noreferrer noopener">
              <TwitterIcon style={{ fontSize: 30, color: "#032E54" }} />
            </a>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
