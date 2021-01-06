import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

import Layout from "../../layout";
import { Form } from "../../components";
import { AppContext } from "../../context";

const ACQUIRE_DECISION = gql`
  mutation GenerateDecision($answer: [String!]) {
    generateDecision(answer: $answer)
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
  const [numberOfPolyps, setNumberOfPolyps] = useState(0);
  const [largestPolypMoreThan10mm, setLargestPolypMoreThan10mm] = useState(
    false
  );
  const [villousArchitecture, setVillousArchitecture] = useState(false);
  const [piecemalResection, setPiecemalResection] = useState(false);
  const [highGradeDysplasia, setHighGradeDysplasia] = useState(false);
  const [answer, setAnswer] = useState([]);

  const [acquireDecision, { data }] = useMutation(ACQUIRE_DECISION, {
    variables: { answer: answer },
  });

  useEffect(() => {
    setAnswer(generateAnswerForDecisionEngine());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    numberOfPolyps,
    largestPolypMoreThan10mm,
    piecemalResection,
    villousArchitecture,
    highGradeDysplasia,
    result,
  ]);

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
      ? answer.push("Size of largest polyp: <10mm")
      : answer.push("Size of largest polyp: >=10mm");

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
      ? answer.push("High grade Dysplasia : Y")
      : answer.push("High grade Dysplasia : N");

    return answer;
  };

  const classes = useStyles();
  const handleConfirmClicked = () => {
    setResult(null);
    acquireDecision();
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
          <Form title="Decision Support Questions">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                style={{ width: 500 }}
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
                label="Size of largest polyp < 10mm"
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
                height: 100,
              }}
            >
              <TextField
                id="outlined-multiline-static"
                label="Result"
                multiline
                rows={2}
                variant="outlined"
                value={result}
              />
            </div>
            <div style={{ display: "flex" }}>
              <MuiThemeProvider theme={custom_theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    margin: "0px 10px",
                    backgroundColor: "#25C8C8",
                    color: "#FFFFFF",
                  }}
                  onClick={() => {
                    context.selectPatient(null);
                    history.push("./decisionsupportpage");
                  }}
                >
                  AGREE
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#FF8888", color: "white" }}
                  color="primary"
                  onClick={() => {}}
                >
                  OVERRIDE
                </Button>
              </MuiThemeProvider>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default DecisionPage;
