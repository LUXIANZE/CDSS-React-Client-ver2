import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Layout from "../../layout";
import { AppContext } from "../../context";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    padding: 50,
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
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
const PatientDetailsPage = () => {
  const context = useContext(AppContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout title="Patient Details Page">
      <div className={classes.container}>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
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
            {context.selectedPatient
              ? context.selectedPatient.firstPage
              : "No patient"}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {context.selectedPatient
              ? context.selectedPatient.secondPage
              : "No patient"}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div>
              {context.selectedPatient
                ? context.selectedPatient.thirdPage
                : "No patient"}
              <button
                onClick={() => {
                  context.selectPatient({
                    firstPage: "one",
                    secondPage: "Two",
                    thirdPage: "Three",
                  });
                }}
              >
                select patient
              </button>
              <button
                onClick={() => {
                  context.selectPatient({});
                }}
              >
                clear patient
              </button>
            </div>
          </TabPanel>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetailsPage;
