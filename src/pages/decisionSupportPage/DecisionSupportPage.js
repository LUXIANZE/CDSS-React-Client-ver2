import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { gql, useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import Layout from "../../layout";
import { AppContext } from "../../context";

const GET_PATIENT = gql`
  query Patient($MRNNumber: String!) {
    patient(MRNNumber: $MRNNumber) {
      id
      ic
      mRNNumber
      name
      patientDemographics {
        mRNNumber
        dateOfBirth
        gender
        race
        bMI
      }
      pastMedicalHistory {
        hypertension
        ischaemicHeartDisease
        heartFailure
        cvaOrStroke
        copd
        iddm
        niddm
      }
      socialAndFamilyHistory {
        isSmoker
        alcoholConsumption
        familyCRCHistory
      }
      colonoscopyHistory {
        priorColonoscopy
        noOfPriorColonoscopy
        isNormal
        abnormalities
      }
      endoscopyReport {
        date
        pdf
        qualityOfPreparation
        locationOfPolyps
        noOfPolyps
        sizeOfLargestPolyp
        polypectomyComplete
        piecemalResection
      }
      histologyReport {
        polypType
        pdf
        sizeOfLargestPolyp
        villousArchitecture
        highGradeDysplasia
      }
    }
  }
`;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "50px 50px 0px 50px",
    overflow: "scroll",
    flexGrow: 1,
  },
  instructions: {
    borderRadius: 15,
    padding: 20,
  },
  input: {
    display: "flex",
    flexDirection: "row",
    margin: "30px 0px",
    minHeight: 80,
  },
  wrapper: {
    position: "relative",
    marginLeft: 10,
    alignSelf: "start",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

const DecisionSupportPage = () => {
  const history = useHistory();
  const context = useContext(AppContext);
  const classes = useStyles();
  const [returnedPatient, setReturnedPatient] = useState(null);
  const [patientMRNNumber, setPatientMRNNumber] = useState("");
  const [searchpatient, { loading, data, error }] = useLazyQuery(GET_PATIENT, {
    variables: { MRNNumber: patientMRNNumber },
  });
  const [searchError, setSearchError] = useState({
    isError: false,
    errorText: "",
  });

  useEffect(() => {}, [patientMRNNumber]);

  const patientClicked = () => {
    console.log("returnedPatient :>> ", returnedPatient);
    if (returnedPatient[0] !== null) {
      context.selectPatient(returnedPatient[0]);
      localStorage.setItem(
        "CDSS-Selected-Patient",
        JSON.stringify(returnedPatient[0])
      );
      history.push("/patientdetailspage");
    }
  };

  const onSearchClicked = () => {
    setReturnedPatient(null);
    searchpatient();
  };

  const mRNChangedHandler = (event) => {
    setPatientMRNNumber(event.target.value);
    if (event.target.value.trim() === "") {
      const searchError = {
        isError: true,
        errorText: "Please key in MRN Number to proceed",
      };
      setSearchError(searchError);
    } else {
      const searchError = {
        isError: false,
        errorText: "",
      };
      setSearchError(searchError);
    }
  };

  if (error) {
    console.log("error :>> ", error);
  }
  if (data) {
    const { patient } = data;
    if (!returnedPatient) setReturnedPatient([patient]);
  }

  return (
    <Layout title="Decision Support Page">
      <div className={classes.container}>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            height: "fit-content",
            flexDirection: "column",
          }}
        >
          <Card className={classes.instructions} raised>
            <CardContent>
              <Typography
                component="h4"
                variant="h4"
                style={{ fontWeight: "bold" }}
              >
                Instructions
              </Typography>
              <Typography>
                • Please key in patient’s RN number in the search bar below and
                press “SEARCH” to retrieve patient data.
              </Typography>
              <Typography>
                • In order to view patient’s data in detail, click on the row of
                patient you would like to view.
              </Typography>
              <Typography>
                • After looking through the details and reports of patients,
                clinicians can proceed to “Decision” page to get decision making
                support.
              </Typography>
            </CardContent>
          </Card>
          <div className={classes.input}>
            <TextField
              error={searchError.isError}
              helperText={searchError.errorText}
              variant="outlined"
              label="MRN Number"
              style={{ alignSelf: "start", minWidth: 500 }}
              onChange={mRNChangedHandler}
            />
            <div className={classes.wrapper}>
              <Button
                onClick={onSearchClicked}
                style={{
                  padding: "15px 16px",
                }}
                disabled={loading}
                variant="contained"
              >
                SEARCH
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>NO.</TableCell>
                  <TableCell align="center">NAME</TableCell>
                  <TableCell align="center">IC/PASSPORT</TableCell>
                  <TableCell align="center">MRN NUMBER</TableCell>
                  <TableCell align="center">GENDER</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {returnedPatient !== null && returnedPatient[0] !== null ? (
                  returnedPatient.map((patient, index) => (
                    <TableRow key={index + 1} onClick={patientClicked}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        {patient?.name || ""}
                      </TableCell>
                      <TableCell align="center">{patient?.ic || ""}</TableCell>
                      <TableCell align="center">
                        {patient?.mRNNumber || ""}
                      </TableCell>
                      <TableCell align="center">
                        {patient?.patientDemographics.gender || ""}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Layout>
  );
};

export default DecisionSupportPage;
