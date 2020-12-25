import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  titleStyle: {
    margin: 0,
    alignSelf: "center",
    padding: 20,
  },
  appbarcontainerStyle: {
    height: "110px",
    backgroundColor: "#25C8C8",
    color: "white",
    display: "flex",
    boxShadow: "0px 12px 14px 5px rgba(0, 0, 0, 0.25)",
  },
});

const Appbar = (props) => {
  const classes = useStyles();
  const { title } = props;

  return (
    <div className={classes.appbarcontainerStyle}>
      <h1 className={classes.titleStyle}>{title}</h1>
    </div>
  );
};

Appbar.propTypes = {
  title: PropTypes.any.isRequired,
};

export default Appbar;
