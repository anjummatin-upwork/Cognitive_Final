import React, { useState } from "react";
import "./nav.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import logo from "../Files/logo.png";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import * as ROUTES from "../../constants/routes";
import { useContext } from "react";
import { UserContext } from "../Context/Context";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useContext(UserContext);
  const saveUserInfo = localStorage.getItem("user");
  const userInfo = JSON.parse(saveUserInfo);
  const theme = useTheme();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //custom style
  const useStyle = makeStyles({
    iconBox: {
      [theme.breakpoints.up("sm")]: {
        marginTop: "53px !important",
      },
    },
  });
  //handle log out
  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/Home";
  };

  const { iconBox } = useStyle();
  return (
    <nav className="header-main-container">
      <div className="main-navbar">
        <div className="logo-part">
          <img src={logo} alt="" />
        </div>
        <div className="menu-part">
          <ul className={isOpen ? "menu-ul mobile-menu-ul" : "menu-ul"}>
            <li className="menu-li">
              <Link className="menu-a " to="/Home">
                {" "}
                Home
              </Link>
            </li>
            <li className="menu-li">
              <Link className="menu-a " to="/Overview">
                {" "}
                Overview
              </Link>
            </li>
            <li className="menu-li">
              <Link className="menu-a " to="/About">
                {" "}
                About
              </Link>
            </li>
            <li className="menu-li">
              <Link className="menu-a " to="/Blog">
                {" "}
                Blog
              </Link>
            </li>
          </ul>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <VscAccount className="user-icon" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={iconBox}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <Link className="sub-menu-link" to={ROUTES.GetYourReport}>
                  Get Your Report{" "}
                </Link>{" "}
                </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link className="sub-menu-link" to={ROUTES.Reports}>
                 Reports{" "}
                </Link>{" "}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link className="sub-menu-link" to={ROUTES.ACCOUNT}>
                  Profile{" "}
                </Link>{" "}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link className="sub-menu-link" to="/Billing">
                  Billing{" "}
                </Link>{" "}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link className="sub-menu-link" to="/">
                  Setting{" "}
                </Link>{" "}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className="sub-menu-link" to="/blogpost">
                  Post blog{" "}
                </Link>{" "}
              </MenuItem>
              {userInfo ? (
                <MenuItem onClick={handleClose}>
                  <span onClick={handleLogOut} style={{ color: "#032e54" }}>
                    Log out
                  </span>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleClose}>
                  {" "}
                  <Link to="/signup" style={{ color: "#032e54" }}>
                    Sign up{" "}
                  </Link>{" "}
                </MenuItem>
              )}
            </Menu>
          </div>
        </div>
        <div className="hamburger-container">
          <GiHamburgerMenu
            className="hamburger-icon"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
