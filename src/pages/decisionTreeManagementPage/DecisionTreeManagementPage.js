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

const DecisionTreeManagementPage = () => {
  const classes = useStyles();
  return (
    <Layout title="Decision Tree Management Page">
      <div className={classes.container}></div>
    </Layout>
  );
};

export default DecisionTreeManagementPage;
