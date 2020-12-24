import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Navbar } from "../components";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});

const Layout = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.children}
      <Navbar />
    </div>
  );
};

export default Layout;
