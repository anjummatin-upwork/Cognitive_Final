/* eslint-disable eqeqeq */
/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./getyourreport.css";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuidv4 } from "uuid";
import database from "../firedb";
import Footer from "../Footer/Footer";
class GetYourReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      fileContent: "",
      list: [],
      dict: [],
      genoTypes: [],
      commonGenoTypes: [],
      genotypeSnps: [],
      genotypeDescription: [],
      genotypeCitations: [],
      Alleles: [],
      visible: true,
      isLoading: true,
    };
  }
  handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      this.setState({ fileName: file.name, fileContent: reader.result });
      this.state.list = this.state.fileContent
        .toString()
        .replace(/\n/g, " ")
        .replace(/^.*#.*$/gm, "")
        .split(" ");
      this.state.list.map((rnaMap) =>
        this.state.dict.push({
          key: rnaMap.split(/\s+/).slice(0, 1),
          value:
            "(" +
            rnaMap.split(/\s+/).slice(3, 4) +
            ", " +
            rnaMap.split(/\s+/).slice(4, 5) +
            ")",
        })
      );

      this.findGenoTypeDescription();
      this.forceUpdate();
    };
    reader.onerror = () => {
      console.log("file error", reader.error);
    };
  };
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.snps().on("value", (snapshot) => {
      this.setState({
        genoTypes: snapshot.val(),
        loading: false,
      });
    });
  }
  reportsPage() {
    window.location = "./reports";
  }
  findGenoTypeDescription() {
    const dataToSave = [];
    database
      .ref("Reports")
      .get()
      .then((reports) => {
        if (
          reports.exists() &&
          Object.values(reports.val()).filter(
            (report) =>
              report.user == JSON.parse(localStorage.getItem("user")) &&
              report.fileName === this.state.fileName
          ).length > 0
        ) {
          alert("There is already a report with same filename!");
          this.reportsPage(); //Taaking to report page if the name already exist!
        } else {
          this.state.dict.map((dictMap) =>
            this.state.genoTypes.map((genoTypeMap) => {
              if (
                String(dictMap.key[0]).toLowerCase() ==
                  String(genoTypeMap.SNP).toLowerCase() &&
                dictMap.value == genoTypeMap.Alleles
              ) {
                //Storing data
                dataToSave.push({
                  GenotypeDescription: genoTypeMap.GenotypeDescription,
                  genotypeCitations:
                    genoTypeMap.Citation1 +
                    genoTypeMap.Citation2 +
                    genoTypeMap.Citation3 +
                    genoTypeMap.Citation4 +
                    genoTypeMap.Citation5,
                  genotypeSnps: dictMap.key[0],
                  Alleles: genoTypeMap.Alleles,
                });

                this.state.genotypeDescription.push(
                  genoTypeMap.GenotypeDescription
                );
                this.state.genotypeCitations.push(
                  genoTypeMap.Citation1 +
                    genoTypeMap.Citation2 +
                    genoTypeMap.Citation3 +
                    genoTypeMap.Citation4 +
                    genoTypeMap.Citation5
                );
                this.state.genotypeSnps.push(dictMap.key);
                this.state.Alleles.push(genoTypeMap.Alleles);
              }
            })
          );
          this.saveData(dataToSave);
        }
        this.state.visible = false;
      })
      .catch((err) => console.log(err.message));
  }
  saveData(dataToSave) {
    const today = Date.now();
    database
      .ref("Reports")
      .push({
        fileName: this.state.fileName,
        id: uuidv4(),
        user: JSON.parse(localStorage.getItem("user")),
        dataTime: Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(today),
        data: dataToSave,
      })
      .then(() => console.log("Data is saved!!!"))
      .catch(this.reportsPage() && this.state.isLoading == false);
  }
  render() {
    return (
      <>
        <div className="get-your-report-main-container ">
          {this.state.visible && (
            <div className="" style={{ width: "100%", height: "100vh" }}>
              <div style={{ width: "100%" }}>
                <div
                  className="pic1getYourReport"
                  style={{ width: "100%", height: "100vh" }}
                >
                  <div
                    class="pic2getYourReport"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div className="get-report-inner-container">
                      <div
                        style={{
                          width: "100%",
                          maxWidth: "1320px",
                          height: "100%",
                          margin: "auto",
                          position: "relative",
                          paddingTop: "40px",
                        }}
                      >
                        <h2 className="card-title getYourReportTextHeader">
                          Get your DNA report
                        </h2>
                        <h3 className="card-text getYourReportTextPara">
                          1. Drop or select your DNA data file from your device
                        </h3>
                        <h5 className="card-text getYourReportTextPara2">
                          Please make sure your file is compatible with our
                          conditions to read your data.
                        </h5>
                        <span
                          className="report-para"
                          style={{ color: "white" }}
                        >
                          Fusce ut placerat orci nulla pellentesque
                        </span>
                        <span
                          className="report-para"
                          style={{ color: "white" }}
                        >
                          Accumsan lacus vel facilisis volutpat
                        </span>
                        <span
                          className="report-para"
                          style={{ color: "white" }}
                        >
                          Fusce ut placerat orci nulla pellentesque
                        </span>
                        <div className="getYourreportUpload">
                          {this.isLoading == true ? (
                            <CircularProgress />
                          ) : (
                            <input
                              className="file-field"
                              type="file"
                              onChange={this.handleFileChange}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default withFirebase(GetYourReport);
