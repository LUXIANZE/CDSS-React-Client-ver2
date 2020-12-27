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

import Layout from "../../layout";
import { AppContext } from "../../context";

const GET_PATIENT = gql`
  query Patient($MRNNumber: String!) {
    patient(MRNNumber: $MRNNumber) {
      id
      mRNNumber
      name
      ic
      histologyReport {
        polypType
        sizeOfLargestPolyp
      }
      patientDemographics {
        mRNNumber
        bMI
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
    padding: 30,
  },
  input: {
    display: "flex",
    flexDirection: "row",
    margin: "50px 0px",
  },
});

const DecisionSupportPage = () => {
  const context = useContext(AppContext);
  const classes = useStyles();
  const [returnedPatient, setReturnedPatient] = useState(null);
  const [patientMRNNumber, setPatientMRNNumber] = useState("");
  const [searchpatient, { loading, data }] = useLazyQuery(GET_PATIENT, {
    variables: { MRNNumber: patientMRNNumber },
  });

  const patientClicked = () => {
    context.selectPatient(returnedPatient[0]);
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
              <Typography component="h5" variant="h5">
                Word of the Day
              </Typography>
              <br />
              <Typography>
                • Please key in patient’s RN number in the search bar below and
                press “SEARCH” to retrieve patient data.
              </Typography>
              <br />
              <Typography>
                • In order to view patient’s data in detail, click on the row of
                patient you would like to view.
              </Typography>
              <br />
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
                  <TableCell align="center">GENDER</TableCell>
                  <TableCell align="center">AGE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {returnedPatient ? (
                  returnedPatient.map((patient, index) => (
                    <TableRow key={index + 1} onClick={patientClicked}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{patient.name}</TableCell>
                      <TableCell align="center">{patient.name}</TableCell>
                      <TableCell align="center">{patient.ic}</TableCell>
                      <TableCell align="center">{patient.mRNNumber}</TableCell>
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
