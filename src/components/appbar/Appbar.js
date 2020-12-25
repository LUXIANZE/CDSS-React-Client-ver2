import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  titleStyle: {
    margin: 0,
  },
  appbarcontainerStyle: {
    height: "110px",
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
