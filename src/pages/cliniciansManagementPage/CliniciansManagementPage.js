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

const CliniciansManagementPage = () => {
  const classes = useStyles();

  return (
    <Layout title="Clinicians Management Page">
      <div className={classes.container}>Some content</div>
    </Layout>
  );
};

export default CliniciansManagementPage;
