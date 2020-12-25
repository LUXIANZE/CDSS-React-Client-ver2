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

const ManagementPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.container}></div>
    </Layout>
  );
};

export default ManagementPage;
