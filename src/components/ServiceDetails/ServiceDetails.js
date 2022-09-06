// --
import { useEffect, useState } from "react";
import database from "../firedb";
import { useParams } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Footer from "./../Footer/Footer";
import "./ServiceDetails.css";
const ServiceDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const handleOnClick = () => {
    const setTodo = database.ref("Orders");
    const OrderData = {
      name: name,
      email: email,
      phone: phone,
      notes: notes,
    };
    setTodo.push(OrderData);
  };
  const { ServiceId } = useParams();
  const [services, setServices] = useState([]);

  // get method start
  useEffect(() => {
    const serviceRef = database.ref("Service");
    serviceRef.on("value", (snapshot) => {
      const multiServices = snapshot.val();

      setServices(multiServices);
    });
  }, []);

  const matchedService = services.find((service) => service.id == ServiceId);

  return (
    <>
      <div className="Billing-main-container">
        <Container maxWidth="lg" className="contact-container">
          <Box
            component="form"
            maxWidth="md"
            sx={{ margin: "55px auto 0 auto", padding: "0 15px" }}
            style={{ maxWidth: "380px", textAlign: "right" }}
          >
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
            />{" "}
            <br /> <br />
            <textarea
              id="Notes"
              name="notes"
              placeholder="Your notes"
              className="common-input-field message-field "
              onChange={(e) => setNotes(e.target.value)}
            />{" "}
            <br /> <br />
            <Typography
              variant="body1"
              style={{ textAlign: "left", color: "white" }}
            >
              {" "}
              Selected Package :{" "}
              <span className="text-danger">
                {" "}
                {matchedService?.title} (${matchedService?.price})
              </span>
            </Typography>
            <Button
              sx={{
                display: "inline-block",
                marginTop: "25px",
                width: "180px",
                background: "#08C5B6",
              }}
              type="submit"
              variant="contained"
              onClick={handleOnClick}
            >
              Checkout
            </Button>
          </Box>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetails;
