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

const DecisionSupportPage = () => {
  const classes = useStyles();

  return (
    <Layout title="Decision Support Page">
      <div className={classes.container}></div>
    </Layout>
  );
};

export default DecisionSupportPage;
