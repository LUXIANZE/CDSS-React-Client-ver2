import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
    margin: "50px 0px",
  },
});

const DecisionSupportPage = () => {
  const history = useHistory();
  const context = useContext(AppContext);
  const classes = useStyles();
  const [returnedPatient, setReturnedPatient] = useState(null);
  const [patientMRNNumber, setPatientMRNNumber] = useState("");
  const [searchpatient, { loading, data }] = useLazyQuery(GET_PATIENT, {
    variables: { MRNNumber: patientMRNNumber },
  });

  const patientClicked = () => {
    console.log("returnedPatient :>> ", returnedPatient);
    if (returnedPatient[0] !== null) {
      context.selectPatient(returnedPatient[0]);
      history.push("/patientdetailspage");
    }
  };

  const onSearchClicked = () => {
    setReturnedPatient(null);
    searchpatient();
  };

  const mRNChangedHandler = (event) => {
    setPatientMRNNumber(event.target.value);
  };

  if (loading) {
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
              variant="outlined"
              style={{ flexGrow: 4 }}
              onChange={mRNChangedHandler}
            ></TextField>
            <Button
              onClick={onSearchClicked}
              style={{ flexGrow: 1, marginLeft: 10 }}
              variant="contained"
            >
              SEARCH
            </Button>
            <div style={{ flexGrow: 5 }} />
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
