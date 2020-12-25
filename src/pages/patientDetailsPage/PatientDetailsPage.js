import React from "react";
import { makeStyles } from "@material-ui/styles";

import Layout from "../../layout";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: "red",
  },
});

const PatientDetailsPage = () => {
  const classes = useStyles();

  return (
    <Layout title="Patient Details Page">
      <div className={classes.container}></div>
    </Layout>
  );
};

export default PatientDetailsPage;
