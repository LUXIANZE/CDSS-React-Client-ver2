import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Layout from "../../layout";
import { AppContext } from "../../context";
import { Form } from "../../components";
import { Button } from "@material-ui/core";

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

const custom_theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#25C8C8",
    },
  },
});

const PatientDetailsPage = () => {
  const history = useHistory();
  const context = useContext(AppContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
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
                <Form title="PATIENT DEMOGRAPHICS">
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
                </Form>
                <Form title="PAST MEDICAL HISTORY">
                  <div className={classes.formContent}>
                    <Typography>HYPERTENSION</Typography>
                    <Typography>Result 1</Typography>
                    <Typography>ISCHAEMIC HEART DISEASE</Typography>
                    <Typography>Result 1</Typography>
                    <Typography>HEART FAILURE</Typography>
                    <Typography>Result 1</Typography>
                    <Typography>CVA/STROKE</Typography>
                    <Typography>Result 1</Typography>
                    <Typography>COPD</Typography>
                    <Typography>Result 1</Typography>
                    <Typography>IDDM</Typography>
                    <Typography>Result 1</Typography>
                    <Typography>NIDDM</Typography>
                    <Typography>Result 1</Typography>
                  </div>
                </Form>
                <Form title="SOCIAL AND FAMILY HISTORY">
                  <div className={classes.formContent}>
                    <Typography>MOKER</Typography>
                    <Typography>Result 1</Typography>
                    <Typography>ALCOHOL CONSUMPTION</Typography>
                    <Typography>Result 1</Typography>
                    <Typography>FAMILY HISTORY OF CRC</Typography>
                    <Typography>Result 1</Typography>
                  </div>
                </Form>
                <Form title="COLONOSCOPY HISTORY">
                  <div className={classes.formContent}>
                    <Typography>
                      EXCLUDING THE INDEX COLONOSCOPY, HAS THE PATIENT HAD PRIOR
                      COLONOSCOPIES?{" "}
                    </Typography>
                    <Typography>Result 1</Typography>
                    <Typography>NUMBER OF PRIOR COLONOSCOPIES</Typography>
                    <Typography>Result 1</Typography>
                    <Typography>WERE PRIOR COLONOSCOPY NORMAL?</Typography>
                    <Typography>Result 1</Typography>
                    <Typography>
                      ABNORMALITIES IN PRIOR COLONOSCOPIES
                    </Typography>
                    <Typography>Result 1</Typography>
                  </div>
                </Form>
              </>
            ) : (
              <button
                onClick={() => {
                  context.selectPatient({});
                }}
              >
                Select Patient
              </button>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {context.selectedPatient ? (
              <Form
                title="FINDINGS DURING INDEX COLONOSCOPY"
                showDocumentBtn={true}
              >
                <div className={classes.formContent}>
                  <Typography>Date of indx colonoscopy</Typography>
                  <Typography>Result 1</Typography>
                  <Typography>Quality of bowel preparation</Typography>
                  <Typography>Result 1</Typography>
                  <Typography>Location of polyp/s</Typography>
                  <Typography>Result 1</Typography>
                  <Typography>Number of polypsdetected</Typography>
                  <Typography>Result 1</Typography>
                  <Typography>Size of the largest polyp /mm</Typography>
                  <Typography>Result 1</Typography>
                  <Typography>Was the polypectomy complete?</Typography>
                  <Typography>Result 1</Typography>
                  <Typography>
                    Was the polyp &gt;20mm and had piecemeal section?
                  </Typography>
                  <Typography>Result 1</Typography>
                </div>
              </Form>
            ) : (
              "No patient"
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {context.selectedPatient ? (
              <Form title="PATIENT DEMOGRAPHICS" showDocumentBtn={true}>
                <div className={classes.formContent}>
                  <Typography>Polyp type</Typography>
                  <Typography>Result 1</Typography>
                  <Typography>Size of the largest polyp /mm</Typography>
                  <Typography>Result 1</Typography>
                  <Typography>Presence of VILLOUS architecture?</Typography>
                  <Typography>Result 1</Typography>
                  <Typography>Presence of HIGH GRADE DYSPLESIA?</Typography>
                  <Typography>Result 1</Typography>
                </div>
              </Form>
            ) : (
              "No patient"
            )}
          </TabPanel>
          <div
            style={{ display: "flex", flexDirection: "column", padding: 50 }}
          >
            <ThemeProvider theme={custom_theme}>
              <Button
                variant="contained"
                color="secondary"
                style={{ alignSelf: "flex-start" }}
                onClick={previousBtnHandler}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ alignSelf: "flex-end" }}
                onClick={nextBtnHandler}
              >
                Next
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetailsPage;
