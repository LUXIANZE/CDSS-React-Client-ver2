import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

import Layout from "../../layout";
import { Form } from "../../components";
import { AppContext } from "../../context";
import OverrideDecisionForm from "./components/overrideDecisionForm/OverrideDecisionForm";

const ACQUIRE_DECISION = gql`
  mutation GenerateDecision($answer: [String!]) {
    generateDecision(answer: $answer)
  }
`;

const FINAL_DECISION = gql`
  mutation FinalDecision($finalDecision: decisionSupportInput!) {
    finalDecision(finalDecision: $finalDecision) {
      isOverride
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
});

const custom_theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      contrastText: "#FFFFFF",
      main: "#25C8C8",
    },
  },
});

const DecisionPage = () => {
  const history = useHistory();
  const context = useContext(AppContext);
  const [result, setResult] = useState("");
  const [reason, setReason] = useState("");
  const [finalDecision, setFinalDecision] = useState({});
  const [numberOfPolyps, setNumberOfPolyps] = useState("0");
  const [largestPolypMoreThan10mm, setLargestPolypMoreThan10mm] = useState(
    JSON.parse(localStorage.getItem("CDSS-Selected-Patient")).endoscopyReport
      .sizeOfLargestPolyp === ">= 10"
  );
  const [piecemalResection, setPiecemalResection] = useState(
    JSON.parse(localStorage.getItem("CDSS-Selected-Patient")).endoscopyReport
      .piecemalResection
  );
  const [villousArchitecture, setVillousArchitecture] = useState(
    JSON.parse(localStorage.getItem("CDSS-Selected-Patient")).histologyReport
      .villousArchitecture
  );
  const [highGradeDysplasia, setHighGradeDysplasia] = useState(
    JSON.parse(localStorage.getItem("CDSS-Selected-Patient")).histologyReport
      .highGradeDysplasia
  );
  const [answer, setAnswer] = useState([]);

  const [acquireDecision, { data, loading }] = useMutation(ACQUIRE_DECISION, {
    variables: { answer: answer },
  });
  const [submitFinalDecision] = useMutation(FINAL_DECISION, {
    variables: { finalDecision: finalDecision },
  });
  const [nextVisit, setNextVisit] = useState("3 Months");
  const [open, setOpen] = useState(false);
  const [noOfPolypsError, setNoOfPolypsError] = useState({
    isError: false,
    errorText: "",
  });

  useEffect(() => {
    if (context.selectedPatient === null) {
      const raw_patient = localStorage.getItem("CDSS-Selected-Patient");
      const patient = JSON.parse(raw_patient);
      context.selectPatient(patient);
    }
    setAnswer(generateAnswerForDecisionEngine());
    setFinalDecision({
      staffId: JSON.parse(localStorage.getItem("user")).staffId,
      mRNNumber: JSON.parse(localStorage.getItem("CDSS-Selected-Patient"))
        .mRNNumber,
      decision: result,
      overridingDecision: reason.trim() === "" ? "" : nextVisit,
      isOverride: reason !== "",
      reason: reason,
    });

    updateNoOfPolypsError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    numberOfPolyps,
    largestPolypMoreThan10mm,
    piecemalResection,
    villousArchitecture,
    highGradeDysplasia,
    result,
    reason,
    context,
  ]);

  const updateNoOfPolypsError = () => {
    if (numberOfPolyps.trim() === "") {
      setNoOfPolypsError({
        isError: true,
        errorText: "Please provide number of polyps",
      });
    } else if (numberOfPolyps < 0) {
      setNoOfPolypsError({
        isError: true,
        errorText: "No of polyps must be at least 0",
      });
    } else {
      setNoOfPolypsError({
        isError: false,
        errorText: "",
      });
    }
  };

  const generateAnswerForDecisionEngine = () => {
    let answer = [];

    // Set answer for Number of Polyps
    if (numberOfPolyps <= 0) {
      answer.push("Number of Polyps: 0");
    } else if (numberOfPolyps > 0 && numberOfPolyps <= 2) {
      answer.push("Number of Polyps: <=2");
    } else if (numberOfPolyps > 2 && numberOfPolyps <= 4) {
      answer.push("Number of Polyps: 3-4");
    } else if (numberOfPolyps > 4 && numberOfPolyps <= 10) {
      answer.push("Number of Polyps: 5-10");
    } else {
      answer.push("Number of Polyps: >10");
    }

    // Set answer for Largest Polyp size more than 10 mm
    largestPolypMoreThan10mm
      ? answer.push("Size of largest polyp: >=10mm")
      : answer.push("Size of largest polyp: <10mm");

    // Set answer for Largest Polyp size more than 10 mm
    piecemalResection
      ? answer.push("> 20mm polyp & Piecemeal resection: Y")
      : answer.push("> 20mm polyp & Piecemeal resection: N");

    // Set answer for Villous architecture
    villousArchitecture
      ? answer.push("Villous architecture: Y")
      : answer.push("Villous architecture: N");

    // Set answer for High grade Dysplasia
    highGradeDysplasia
      ? answer.push("High grade Dysplasia: Y")
      : answer.push("High grade Dysplasia: N");

    return answer;
  };

  const classes = useStyles();
  const handleConfirmClicked = () => {
    setResult(null);
    acquireDecision();
  };
  const handleAgreeClicked = () => {
    if (result.trim() !== "") {
      submitFinalDecision().catch((error) => {
        console.log("error :>> ", error);
      });
      context.selectPatient(null);
      localStorage.removeItem("CDSS-Selected-Patient");
      history.push("./decisionsupportpage");
    } else {
      alert(
        "Please acquire decision by clicking on CONFIRM button before proceeding"
      );
    }
  };
  const handleOverrideClicked = () => {
    if (result.trim() !== "") {
      setOpen(true);
    } else {
      alert(
        "Please acquire decision by clicking on CONFIRM button before proceeding"
      );
    }
  };
  const handleAbortClicked = () => {
    context.selectPatient(null);
    localStorage.removeItem("CDSS-Selected-Patient");
    history.push("./decisionsupportpage");
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (data) {
    if (!result) setResult(data.generateDecision);
  }

  return (
    <Layout title="Decision Page">
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
                • Please ensure the parameters filled in below are correct.
              </Typography>
              <Typography>
                • Please update the number of polyps manually as it is unable to
                be extracted from provided report.
              </Typography>
              <Typography>
                • After filling in required parameters, click on CONFIRM button
              </Typography>
            </CardContent>
          </Card>
          <Form title="Decision Support Questions">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                error={noOfPolypsError.isError}
                helperText={noOfPolypsError.errorText}
                style={{ width: 500, minHeight: 80 }}
                variant="outlined"
                type="number"
                label="Number of Polyps"
                value={numberOfPolyps}
                onChange={(event) => {
                  setNumberOfPolyps(event.target.value);
                }}
              ></TextField>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#25C8C8" }}
                    checked={largestPolypMoreThan10mm}
                  />
                }
                label="Size of largest polyp >= 10mm"
                onChange={(event) => {
                  setLargestPolypMoreThan10mm(event.target.checked);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#25C8C8" }}
                    checked={piecemalResection}
                  />
                }
                label="> 20mm polyp and Piecemeal resection"
                onChange={(event) => {
                  setPiecemalResection(event.target.checked);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#25C8C8" }}
                    checked={villousArchitecture}
                  />
                }
                label="Villous Architecture"
                onChange={(event) => {
                  setVillousArchitecture(event.target.checked);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#25C8C8" }}
                    checked={highGradeDysplasia}
                  />
                }
                label="High Grade Dysplasia"
                onChange={(event) => {
                  setHighGradeDysplasia(event.target.checked);
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <MuiThemeProvider theme={custom_theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleConfirmClicked}
                  style={{ backgroundColor: "#25C8C8", color: "#FFFFFF" }}
                >
                  CONFIRM
                </Button>
              </MuiThemeProvider>
            </div>
            <Divider style={{ margin: "50px 10px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                height: "auto",
              }}
            >
              <TextField
                id="outlined-multiline-static"
                label="Result"
                multiline
                rows={2}
                variant="outlined"
                value={
                  loading
                    ? "Generating decision from Decision Engine, please wait patiently"
                    : result
                }
                style={{ margin: "10px 0px" }}
              />
              <div style={{ height: 10, margin: 10 }}>
                {loading && <LinearProgress />}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <MuiThemeProvider theme={custom_theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    margin: "0px 10px",
                    padding: "6px 16px",
                    backgroundColor: "#25C8C8",
                    color: "#FFFFFF",
                  }}
                  onClick={handleAgreeClicked}
                >
                  AGREE
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#FF8888",
                    padding: "6px 16px",
                    color: "white",
                  }}
                  color="primary"
                  onClick={handleOverrideClicked}
                >
                  OVERRIDE
                </Button>
              </MuiThemeProvider>
              <Button
                style={{
                  margin: "0px 10px",
                  padding: "6px 16px",
                  backgroundColor: "#686D75",
                  color: "#FFFFFF",
                }}
                variant="contained"
                onClick={handleAbortClicked}
              >
                ABORT TRANSACTION
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <OverrideDecisionForm
        handleClose={handleClose}
        open={open}
        reason={reason}
        setReason={setReason}
        mutation={submitFinalDecision}
        nextVisit={nextVisit}
        setNextVisit={setNextVisit}
      />
    </Layout>
  );
};

export default DecisionPage;
