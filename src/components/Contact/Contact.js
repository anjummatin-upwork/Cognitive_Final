import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
// import emailjs from "emailjs-com";
import "./Contact.css";
import Footer from "../Footer/Footer";
import database from "../firedb";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  /*   const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_f6n3mmu",
        "template_fuib1xd",
        e.target,
        "user_7vE7p6vyHJsp3jzRaJIgj"
      )
      .then();
    e.target.reset();
  }; */

  const handleOnClick = () => {
    const setTodo = database.ref("Contact");
    const contactData = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };
    setTodo.push(contactData);
  };

  /* Note: if user fill the contact form his/her details will be stored in firebase data base. Collection name is Contact. */
  return (
    <>
      <div className="contact-main-container">
        <Container maxWidth="lg" className="contact-container">
          <Box>
            <Typography variant="h3" className="contact-heading">
              {" "}
              Contact us
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco <br />{" "}
              laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>
          <Box
            component="form"
            maxWidth="md"
            // onSubmit={sendEmail}
            sx={{ margin: "55px auto 0 auto", padding: "0 15px" }}
          >
            <Grid container spacing={{ xs: 0, md: 4 }} sx={{ width: "100%" }}>
              <Grid item xs={12} md={6}>
                <input
                  type="text"
                  required
                  id="Name"
                  name="name"
                  placeholder="Your name"
                  className="common-input-field name-field"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  required
                  id="Email"
                  name="email"
                  placeholder="Your email"
                  className="common-input-field email-field "
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="number"
                  id="Phone"
                  name="phone"
                  placeholder="Your Phone number (optional)"
                  className="common-input-field phone-field "
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <textarea
                  id="Message"
                  name="message"
                  placeholder="Your message"
                  className="common-input-field message-field "
                  onChange={(e) => setMessage(e.target.value)}
                />{" "}
                <Button
                  sx={{
                    display: "inline-block",
                    marginTop: "25px",
                    width: "180px",
                    background: "#08C5B6",
                  }}
                  type="submit"
                  variant="contained"
                  className="contact-submit-button"
                  onClick={handleOnClick}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
