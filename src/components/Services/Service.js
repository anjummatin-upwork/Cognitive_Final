import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import MaterialButton from "@mui/material/Button";

import React from "react";
import { useHistory } from "react-router-dom";
import StarIcon from "@mui/icons-material/StarBorder";
import "./Service.css";
const Service = (props) => {
  const { title, period, price, data, id } = props.sub || {};

  const history = useHistory();

  return (
    <Grid item md={4}>
      <Box
        className="service-card"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {props.sub.duration && (
          <Typography variant="h6" className="duration-tag">
            {props?.sub?.duration}
          </Typography>
        )}

        <h3 className="service-title text-center"> {title} </h3>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              mb: 3,
              color: "#036AC3",
            }}
          >
            <Typography variant="h3" color="text.primary">
              ${price}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {period}
            </Typography>
          </Box>
          <ul style={{ textAlign: "center", padding: "0" }}>
            <Typography
              variant="body1"
              align="left"
              style={{ color: "#032e54", marginBottom: "10px" }}
            >
              This plan includes:{" "}
            </Typography>
            <Typography
              variant="body1"
              align="left"
              style={{ color: "#032e54" }}
            >
              {data}
            </Typography>
          </ul>
        </CardContent>
        <CardActions
          style={{ position: "absolute", bottom: "20px", left: "8%" }}
        >
          <MaterialButton
            onClick={() => history.push(`/ServiceDetails/${id}`)}
            fullWidth
            variant="outlined"
            style={{
              backgroundColor: "#032E54",
              color: "#FFFFFF",
              width: "200px",
            }}
          >
            Get this plan
          </MaterialButton>
        </CardActions>
      </Box>
    </Grid>
  );
};

export default Service;
