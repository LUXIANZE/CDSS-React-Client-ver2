import React, { useContext } from "react";
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

import Layout from "../../layout";
import { AppContext } from "../../context";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("1", 159, 6.0, 24, 4.0),
  createData("2", 237, 9.0, 37, 4.3),
  createData("3", 262, 16.0, 24, 6.0),
  createData("4", 305, 3.7, 67, 4.3),
  createData("5", 356, 16.0, 49, 3.9),
];

const DecisionSupportPage = () => {
  const context = useContext(AppContext);
  const classes = useStyles();
  const selectPatientClicked = () => {
    context.selectPatient({});
  };
  const patientClicked = () => {
    console.log("clicked");
  };
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
            <TextField variant="outlined" style={{ flexGrow: 4 }}></TextField>
            <Button
              onClick={selectPatientClicked}
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
                {rows ? (
                  rows.map((row) => (
                    <TableRow key={row.name} onClick={patientClicked}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
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
