import React, { useState } from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { palette } from "@material-ui/system";
import grey from "@material-ui/core/colors/grey";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Layout from "../../layout";
import { Form } from "../../components";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "50px 50px 0px 50px",
    overflow: "scroll",
    flexGrow: 1,
  },
  formContent: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: 30,
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
  const [result, setResult] = useState("");
  let clicked = 0;
  const classes = useStyles();
  const handleConfirmClicked = () => {
    clicked++;
    setResult("Some result" + clicked);
  };

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
            <div className={classes.formContent}>
              <Typography>MRN Number</Typography>
              <Typography>Result 1</Typography>
              <Typography>Date of Birth</Typography>
              <Typography>Result 1</Typography>
              <Typography>Gender</Typography>
              <Typography>Result 1</Typography>
              <Typography>Race</Typography>
              <Typography>Result 1</Typography>
              <Typography>Body Mass Index</Typography>
              <Typography>Result 1</Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <MuiThemeProvider theme={custom_theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleConfirmClicked}
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
              <Typography>Result</Typography>
              <Typography>{result}</Typography>
            </div>
            <div style={{ display: "flex" }}>
              <MuiThemeProvider theme={custom_theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "0px 10px" }}
                  onClick={handleConfirmClicked}
                >
                  AGREE
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#FF8888", color: "white" }}
                  color="primary"
                  onClick={handleConfirmClicked}
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
