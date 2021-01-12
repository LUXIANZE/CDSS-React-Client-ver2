import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Layout from "../../layout";
import { AppContext } from "../../context";
import { Form } from "../../components";
import { Button } from "@material-ui/core";
import {
  UpdateColonoscopyHistory,
  UpdateEndoscopyReport,
  UpdateHistologyReport,
  UpdatePastMedicalHistory,
  UpdatePatientDemographics,
  UpdateSocialAndFamilyHistory,
} from "./components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    padding: "50px 50px 0px 50px",
    overflow: "scroll",
  },
  formContent: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: 30,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
      style={{ display: "flex", flexDirection: "column", padding: "0px 24px" }}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const PatientDetailsPage = () => {
  const [
    openUpdateColonoscopyHistory,
    setOpenUpdateColonoscopyHistory,
  ] = useState(false);
  const [openUpdateEndoscopyReport, setOpenUpdateEndoscopyReport] = useState(
    false
  );
  const [openUpdateHistologyReport, setOpenUpdateHistologyReport] = useState(
    false
  );
  const [
    openUpdatePastMedicalHistory,
    setOpenUpdatePastMedicalHistory,
  ] = useState(false);
  const [
    openUpdatePatientDemographics,
    setOpenUpdatePatientDemographics,
  ] = useState(false);
  const [
    openUpdateSocialAndFamilyHistory,
    setOpenUpdateSocialAndFamilyHistory,
  ] = useState(false);

  // Modal open handler
  const handleOpenUpdateColonoscopyHistory = () => {
    setOpenUpdateColonoscopyHistory(true);
  };

  const handleOpenUpdateEndoscopyReport = () => {
    setOpenUpdateEndoscopyReport(true);
  };

  const handleOpenEndoscopyReport = () => {
    let popupwin = window.open(
      context.selectedPatient.endoscopyReport.pdf,
      "somename",
      "width=800, height=1000"
    );
    popupwin.resizeTo(800, 1000);
    popupwin.moveBy(100, 100);
  };

  const handleOpenHistologyReport = () => {
    let popupwin = window.open(
      context.selectedPatient.histologyReport.pdf,
      "somename",
      "width=800, height=1000"
    );
    popupwin.resizeTo(800, 1000);
    popupwin.moveBy(100, 100);
  };

  const handleOpenUpdateHistologyReport = () => {
    setOpenUpdateHistologyReport(true);
  };

  const handleOpenUpdatePastMedicalHistory = () => {
    setOpenUpdatePastMedicalHistory(true);
  };

  const handleOpenUpdatePatientDemographics = () => {
    setOpenUpdatePatientDemographics(true);
  };

  const handleOpenUpdateSocialAndFamilyHistory = () => {
    setOpenUpdateSocialAndFamilyHistory(true);
  };

  // Modal close handler
  const handleCloseUpdateColonoscopyHistory = () => {
    setOpenUpdateColonoscopyHistory(false);
  };

  const handleCloseUpdateEndoscopyReport = () => {
    setOpenUpdateEndoscopyReport(false);
  };

  const handleCloseUpdateHistologyReport = () => {
    setOpenUpdateHistologyReport(false);
  };

  const handleCloseUpdatePastMedicalHistory = () => {
    setOpenUpdatePastMedicalHistory(false);
  };

  const handleCloseUpdatePatientDemographics = () => {
    setOpenUpdatePatientDemographics(false);
  };

  const handleCloseUpdateSocialAndFamilyHistory = () => {
    setOpenUpdateSocialAndFamilyHistory(false);
  };

  const history = useHistory();
  const context = useContext(AppContext);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const previousBtnHandler = () => {
    const destination = value === 0 ? 0 : value - 1;
    setValue(destination);
  };
  const nextBtnHandler = () => {
    const destination = value === 2 ? 2 : value + 1;
    if (value === 2) {
      history.push("/decisionpage");
    }
    setValue(destination);
  };

  return (
    <Layout title="Patient Details Page">
      <div className={classes.container}>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            height: "fit-content",
            backgroundColor: "#F9F9F9",
            flexDirection: "column",
          }}
        >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Patient Data" />
              <Tab label="Endoscopy Report" />
              <Tab label="Histology Report" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            {context.selectedPatient ? (
              <>
                <Form
                  title="PATIENT DEMOGRAPHICS"
                  showEditBtn={true}
                  editBtnHandler={handleOpenUpdatePatientDemographics}
                >
                  <div className={classes.formContent}>
                    <Typography>MRN Number</Typography>
                    <Typography>
                      {context.selectedPatient.patientDemographics.mRNNumber
                        ? context.selectedPatient.patientDemographics.mRNNumber
                        : "N/A"}
                    </Typography>
                    <Typography>IC/PASSPORT</Typography>
                    <Typography>
                      {context.selectedPatient.ic
                        ? context.selectedPatient.ic
                        : "N/A"}
                    </Typography>
                    <Typography>Date of Birth</Typography>
                    <Typography>
                      {context.selectedPatient.patientDemographics.dateOfBirth
                        ? context.selectedPatient.patientDemographics
                            .dateOfBirth
                        : "N/A"}
                    </Typography>
                    <Typography>Gender</Typography>
                    <Typography>
                      {context.selectedPatient.patientDemographics.gender
                        ? context.selectedPatient.patientDemographics.gender
                        : "N/A"}
                    </Typography>
                    <Typography>Race</Typography>
                    <Typography>
                      {context.selectedPatient.patientDemographics.race
                        ? context.selectedPatient.patientDemographics.race
                        : "N/A"}
                    </Typography>
                    <Typography>Body Mass Index</Typography>
                    <Typography>
                      {context.selectedPatient.patientDemographics.bMI
                        ? context.selectedPatient.patientDemographics.bMI
                        : "N/A"}
                    </Typography>
                  </div>
                </Form>
                <Form
                  title="PAST MEDICAL HISTORY"
                  showEditBtn={true}
                  editBtnHandler={handleOpenUpdatePastMedicalHistory}
                >
                  <div className={classes.formContent}>
                    <Typography>HYPERTENSION</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.pastMedicalHistory.hypertension
                          ? context.selectedPatient.pastMedicalHistory
                              .hypertension
                          : false
                      }
                    />
                    <Typography>ISCHAEMIC HEART DISEASE</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.pastMedicalHistory
                          .ischaemicHeartDisease
                          ? context.selectedPatient.pastMedicalHistory
                              .ischaemicHeartDisease
                          : false
                      }
                    />
                    <Typography>HEART FAILURE</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.pastMedicalHistory.heartFailure
                          ? context.selectedPatient.pastMedicalHistory
                              .heartFailure
                          : false
                      }
                    />
                    <Typography>CVA/STROKE</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.pastMedicalHistory.cvaOrStroke
                          ? context.selectedPatient.pastMedicalHistory
                              .cvaOrStroke
                          : false
                      }
                    />
                    <Typography>COPD</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.pastMedicalHistory.copd
                          ? context.selectedPatient.pastMedicalHistory.copd
                          : false
                      }
                    />
                    <Typography>IDDM</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.pastMedicalHistory.iddm
                          ? context.selectedPatient.pastMedicalHistory.iddm
                          : false
                      }
                    />
                    <Typography>NIDDM</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.pastMedicalHistory.niddm
                          ? context.selectedPatient.pastMedicalHistory.niddm
                          : false
                      }
                    />
                  </div>
                </Form>
                <Form
                  title="SOCIAL AND FAMILY HISTORY"
                  showEditBtn={true}
                  editBtnHandler={handleOpenUpdateSocialAndFamilyHistory}
                >
                  <div className={classes.formContent}>
                    <Typography>SMOKER</Typography>
                    <Typography>
                      {context.selectedPatient.socialAndFamilyHistory.isSmoker
                        ? context.selectedPatient.socialAndFamilyHistory
                            .isSmoker
                        : ""}
                    </Typography>
                    <Typography>ALCOHOL CONSUMPTION</Typography>
                    <Typography>
                      {context.selectedPatient.socialAndFamilyHistory
                        .alcoholConsumption
                        ? context.selectedPatient.socialAndFamilyHistory
                            .alcoholConsumption
                        : ""}
                    </Typography>
                    <Typography>FAMILY HISTORY OF CRC</Typography>
                    <Typography>
                      {context.selectedPatient.socialAndFamilyHistory
                        .familyCRCHistory
                        ? context.selectedPatient.socialAndFamilyHistory
                            .familyCRCHistory
                        : ""}
                    </Typography>
                  </div>
                </Form>
                <Form
                  title="COLONOSCOPY HISTORY"
                  showEditBtn={true}
                  editBtnHandler={handleOpenUpdateColonoscopyHistory}
                >
                  <div className={classes.formContent}>
                    <Typography>
                      EXCLUDING THE INDEX COLONOSCOPY, HAS THE PATIENT HAD PRIOR
                      COLONOSCOPIES?
                    </Typography>
                    <div style={{ display: "flex" }}>
                      <Checkbox
                        checked={
                          context.selectedPatient.colonoscopyHistory
                            .priorColonoscopy
                            ? context.selectedPatient.colonoscopyHistory
                                .priorColonoscopy
                            : false
                        }
                      />
                    </div>
                    <Typography>NUMBER OF PRIOR COLONOSCOPIES</Typography>
                    <Typography>
                      {context.selectedPatient.colonoscopyHistory
                        .noOfPriorColonoscopy
                        ? context.selectedPatient.colonoscopyHistory
                            .noOfPriorColonoscopy
                        : "N/A"}
                    </Typography>
                    <Typography>WERE PRIOR COLONOSCOPY NORMAL?</Typography>
                    <Typography>
                      {context.selectedPatient.colonoscopyHistory.isNormal
                        ? context.selectedPatient.colonoscopyHistory.isNormal
                        : "N/A"}
                    </Typography>
                    <Typography>
                      ABNORMALITIES IN PRIOR COLONOSCOPIES
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.colonoscopyHistory
                                .abnormalities
                                ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
                                    "ADENOMATOUS_POLYPS"
                                  )
                                : false
                            }
                          />
                        }
                        label="ADENOMATOUS POLYPS"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.colonoscopyHistory
                                .abnormalities
                                ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
                                    "SERRATED_POLYPS"
                                  )
                                : false
                            }
                          />
                        }
                        label="SERRATED POLYPS"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.colonoscopyHistory
                                .abnormalities
                                ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
                                    "MALIGNANT_POLYPS"
                                  )
                                : false
                            }
                          />
                        }
                        label="MALIGNANT POLYPS"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.colonoscopyHistory
                                .abnormalities
                                ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
                                    "COLORECTAL_CANCER"
                                  )
                                : false
                            }
                          />
                        }
                        label="COLORECTAL CANCER"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.colonoscopyHistory
                                .abnormalities
                                ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
                                    "INFLAMMATORY_BOWEL_DISEASE"
                                  )
                                : false
                            }
                          />
                        }
                        label="INFLAMMATORY BOWEL DISEASE"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.colonoscopyHistory
                                .abnormalities
                                ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
                                    "DIVERTICULAR_DISEASE"
                                  )
                                : false
                            }
                          />
                        }
                        label="DIVERTICULAR DISEASE"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.colonoscopyHistory
                                .abnormalities
                                ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
                                    "OTHER"
                                  )
                                : false
                            }
                          />
                        }
                        label="OTHER"
                      />
                    </div>
                  </div>
                </Form>
              </>
            ) : (
              "No Patient"
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {context.selectedPatient ? (
              <Form
                title="FINDINGS DURING INDEX COLONOSCOPY"
                showDocumentBtn={true}
                documentBtnHandler={handleOpenEndoscopyReport}
                showEditBtn={true}
                editBtnHandler={handleOpenUpdateEndoscopyReport}
              >
                <div className={classes.formContent}>
                  <Typography>Date of index colonoscopy</Typography>
                  <Typography>
                    {context.selectedPatient.endoscopyReport.date
                      ? context.selectedPatient.endoscopyReport.date
                      : "N/A"}
                  </Typography>
                  <Typography>Quality of bowel preparation</Typography>
                  <Typography>
                    {context.selectedPatient.endoscopyReport
                      .qualityOfPreparation
                      ? context.selectedPatient.endoscopyReport
                          .qualityOfPreparation
                      : "N/A"}
                  </Typography>
                  <Typography>Location of polyp/s</Typography>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.endoscopyReport
                              .locationOfPolyps
                              ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
                                  "CAECUM"
                                )
                              : false
                          }
                        />
                      }
                      label="Caecum"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.endoscopyReport
                              .locationOfPolyps
                              ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
                                  "ASCENDING_COLON"
                                )
                              : false
                          }
                        />
                      }
                      label="Ascending colon"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.endoscopyReport
                              .locationOfPolyps
                              ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
                                  "TRANSVERSE_COLON"
                                )
                              : false
                          }
                        />
                      }
                      label="Transverse colon"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.endoscopyReport
                              .locationOfPolyps
                              ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
                                  "DESCENDING_COLON"
                                )
                              : false
                          }
                        />
                      }
                      label="Descending colon"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.endoscopyReport
                              .locationOfPolyps
                              ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
                                  "SIGMOID_COLON"
                                )
                              : false
                          }
                        />
                      }
                      label="Sigmoid colon"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.endoscopyReport
                              .locationOfPolyps
                              ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
                                  "RECTUM"
                                )
                              : false
                          }
                        />
                      }
                      label="Rectum"
                    />
                  </div>
                  <Typography>Number of polypsdetected</Typography>
                  <Typography>
                    {context.selectedPatient.endoscopyReport.noOfPolyps
                      ? context.selectedPatient.endoscopyReport.noOfPolyps
                      : "N/A"}
                  </Typography>
                  <Typography>Size of the largest polyp /mm</Typography>
                  <Typography>
                    {context.selectedPatient.endoscopyReport.sizeOfLargestPolyp
                      ? context.selectedPatient.endoscopyReport
                          .sizeOfLargestPolyp
                      : "N/A"}
                  </Typography>
                  <Typography>Was the polypectomy complete?</Typography>
                  <div>
                    <Checkbox
                      checked={
                        context.selectedPatient.endoscopyReport
                          .polypectomyComplete
                          ? context.selectedPatient.endoscopyReport
                              .polypectomyComplete
                          : false
                      }
                    />
                  </div>

                  <Typography>
                    Was the polyp &gt;20mm and had piecemeal section?
                  </Typography>
                  <div>
                    <Checkbox
                      checked={
                        context.selectedPatient.endoscopyReport
                          .piecemalResection
                          ? context.selectedPatient.endoscopyReport
                              .piecemalResection
                          : false
                      }
                    />
                  </div>
                </div>
              </Form>
            ) : (
              "No patient"
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {context.selectedPatient ? (
              <Form
                title="HISTOLOGY OF POLYPS FROM INDEX COLONOSCOPY"
                showDocumentBtn={true}
                documentBtnHandler={handleOpenHistologyReport}
                showEditBtn={true}
                editBtnHandler={handleOpenUpdateHistologyReport}
              >
                <div className={classes.formContent}>
                  <Typography>Polyp type</Typography>
                  <Typography>
                    {context.selectedPatient.histologyReport.polypType
                      ? context.selectedPatient.histologyReport.polypType
                      : "N/A"}
                  </Typography>

                  <Typography>Size of the largest polyp /mm</Typography>
                  <Typography>
                    {context.selectedPatient.histologyReport.sizeOfLargestPolyp
                      ? context.selectedPatient.histologyReport
                          .sizeOfLargestPolyp
                      : "N/A"}
                  </Typography>
                  <Typography>Presence of VILLOUS architecture?</Typography>
                  <div>
                    <Checkbox
                      checked={
                        context.selectedPatient.histologyReport
                          .villousArchitecture
                          ? context.selectedPatient.histologyReport
                              .villousArchitecture
                          : false
                      }
                    />
                  </div>

                  <Typography>Presence of HIGH GRADE DYSPLESIA?</Typography>
                  <div>
                    <Checkbox
                      checked={
                        context.selectedPatient.histologyReport
                          .highGradeDysplasia
                          ? context.selectedPatient.histologyReport
                              .highGradeDysplasia
                          : false
                      }
                    />
                  </div>
                </div>
              </Form>
            ) : (
              "No patient"
            )}
          </TabPanel>
          <div
            style={{ display: "flex", flexDirection: "column", padding: 50 }}
          >
            <Button
              variant="contained"
              color="secondary"
              style={{
                alignSelf: "flex-start",
                backgroundColor: "#25C8C8",
                color: "#FFFFFF",
              }}
              onClick={previousBtnHandler}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{
                alignSelf: "flex-end",
                backgroundColor: "#25C8C8",
                color: "#FFFFFF",
              }}
              onClick={nextBtnHandler}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <UpdateColonoscopyHistory
        open={openUpdateColonoscopyHistory}
        handleClose={handleCloseUpdateColonoscopyHistory}
      />
      <UpdateEndoscopyReport
        open={openUpdateEndoscopyReport}
        handleClose={handleCloseUpdateEndoscopyReport}
      />
      <UpdateHistologyReport
        open={openUpdateHistologyReport}
        handleClose={handleCloseUpdateHistologyReport}
      />
      <UpdatePastMedicalHistory
        open={openUpdatePastMedicalHistory}
        handleClose={handleCloseUpdatePastMedicalHistory}
      />
      <UpdatePatientDemographics
        open={openUpdatePatientDemographics}
        handleClose={handleCloseUpdatePatientDemographics}
      />
      <UpdateSocialAndFamilyHistory
        open={openUpdateSocialAndFamilyHistory}
        handleClose={handleCloseUpdateSocialAndFamilyHistory}
      />
    </Layout>
  );
};

export default PatientDetailsPage;
