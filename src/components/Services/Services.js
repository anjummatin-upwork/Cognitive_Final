import React, { useEffect, useState } from "react";
import Service from "./Service";
import { Grid } from "@material-ui/core";
import "./Services.css";
import database from "../firedb";
const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const serviceRef = database.ref("Service");
    serviceRef.on("value", (snapshot) => {
      const multiServices = snapshot.val();
      setServices(multiServices);
    });
  }, []);
  return (
    <Grid container spacing={5} alignItems="flex-end">
      {services.map((sub) => (
        <Service key={sub.id} sub={sub}></Service>
      ))}
    </Grid>
  );
};

export default Services;
