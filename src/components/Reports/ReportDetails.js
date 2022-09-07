/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import database from "../firedb";
import Footer from "./../Footer/Footer";
import Box from "@mui/material/Box";
import MaterialCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MaterialContainer from "@mui/material/Container";
import Avatar from "@material-ui/core/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import "../GetYourReport/getyourreport.css";
const ReportDetails = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState([]);

  useEffect(() => {
    const reports = database.ref("Reports");
    reports.on("value", (snapshot) => {
      const report = snapshot.val();
      const reports = Object.values(report);
      setReport(reports);
    });
  }, []);
  const matchedReport = report.find((reports) => reports.fileName == reportId);

  return (
    <div>
      <div>
        <MaterialContainer maxWidth="md" component="main">
          <Box
            sx={{
              width: "100%",
              padding: "20px",
            }}
          >
            <Typography
              variant="h1"
              style={{ color: "#032E54", textAlign: "center" }}
            >
              Cognitive Report{" "}
            </Typography>{" "}
            <br /> <br />
          </Box>
          <Grid container spacing={5} alignItems="flex-end">
            {matchedReport?.data.map((data) => (
              <Grid item xs={12} sm={6} md={4}>
                <MaterialCard
                  sx={{
                    minHeight: "500px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardHeader
                    title={String(data?.genotypeSnps).toUpperCase()}
                    titleTypographyProps={{ align: "left" }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                    action={
                      <Stack direction="row" spacing={2}>
                        <Avatar style={{ backgroundColor: "#08C5B6" }}>
                          {data?.Alleles.replace(/[^a-z]/gi, "").slice(0, 1)}{" "}
                        </Avatar>{" "}
                        <Avatar style={{ backgroundColor: "#545454" }}>
                          {" "}
                          {data?.Alleles.replace(/[^a-z]/gi, "").slice(
                            1,
                            2
                          )}{" "}
                        </Avatar>
                      </Stack>
                    }
                  />
                  <CardContent>
                    <ul> {data?.item} </ul>{" "}
                    <Tooltip title={data?.genotypeCitations}>
                      <IconButton>
                        <FormatQuoteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardContent>
                  <CardContent>{data?.GenotypeDescription}</CardContent>
                </MaterialCard>
              </Grid>
            ))}
          </Grid>
        </MaterialContainer>
      </div>
      <Footer />
    </div>
  );
};

export default ReportDetails;
