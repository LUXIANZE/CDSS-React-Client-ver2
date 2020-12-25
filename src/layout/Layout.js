import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropType from "prop-types";

import { Appbar, Navbar } from "../components";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  container: {
    height: "calc(100% - 110px)",
    display: "flex",
  },
});

const Layout = (props) => {
  const { title } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Appbar title={title} />
      <div className={classes.container}>
        <Navbar />
        {props.children}
      </div>
    </div>
  );
};

Layout.protoType = {
  title: PropType.string.isRequired,
};

export default Layout;
