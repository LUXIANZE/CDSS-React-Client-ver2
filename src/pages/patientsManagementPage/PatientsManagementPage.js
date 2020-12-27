import React from "react";
import { makeStyles } from "@material-ui/styles";

import Layout from "../../layout";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
});

const PatientsManagementPage = () => {
  const classes = useStyles();

  return (
    <Layout title="Patients Management Page">
      <div className={classes.container}></div>
    </Layout>
  );
};

export default PatientsManagementPage;
