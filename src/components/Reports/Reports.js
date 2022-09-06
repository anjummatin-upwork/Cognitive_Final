/* eslint-disable eqeqeq */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import database from "../firedb";
import { useHistory } from "react-router-dom";
import Footer from "./../Footer/Footer";
import { Table, Button, Container } from "react-bootstrap";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
const Reports = () => {
  const history = useHistory();
  const [report, setReport] = useState([]);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("user"));
    const reports = database.ref("Reports").orderByChild("user").equalTo(local);
    reports.on("value", (snapshot) => {
      const report = snapshot.val();
      if (report != null) {
        setReport(Object.values(report));
      } else {
        history.push(`/GetYourReport`);
      }
    });
  }, [history]);

  /*
  const deleteAllReport = () => {
    const reports = database.ref("Reports");
    reports.remove();
  };
  */
  const handleShowReportDetails = (fileName) => {
    history.push(`/reportdetails/${fileName}`);
  };

  return (
    <div>
      <div>
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
          </Typography>
          <br /> <br />
        </Box>
        <div className="container">
          <Container style={{ minHeight: "80vh" }}>
            <Table responsive>
              <thead>
                <tr>
                  <th className="text-center">S/N</th>
                  <th className="text-center">Name</th>
                  <th className="text-center"> Upload Date</th>
                  <th className="text-center"> Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(report).map((report, index) => {
                  const { fileName, dataTime } = report;
                  return (
                    <tr key={fileName}>
                      <td className="text-center">{index + 1} </td>
                      <td className="text-center">{fileName}</td>
                      <td className="text-center">{dataTime}</td>
                      <td className="text-center">
                        <Button
                          style={{
                            backgroundColor: "#032E54",
                            marginButtom: "5px",
                          }}
                          onClick={() => handleShowReportDetails(fileName)}
                        >
                          {" "}
                          View Report
                        </Button>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Reports;
