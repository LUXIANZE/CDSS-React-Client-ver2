import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";

import { AppContext } from "../../context";

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
  const { user, logout } = useContext(AppContext);
  const history = useHistory();
  const classes = useStyles();
  const { title } = props;

  const handleLogout = () => {
    logout();
  };
  if (!user) {
    history.replace("/login");
  }
  return (
    <>
      {user && (
        <div className={classes.appbarcontainerStyle}>
          <div style={{ flexGrow: 1, display: "flex", padding: "0px 20px" }}>
            <AccountCircleIcon style={{ fontSize: 80, alignSelf: "center" }} />
            <Typography
              variant="h4"
              component="h1"
              className={classes.titleStyle}
            >
              {user.name}
            </Typography>
          </div>

          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              style={{
                backgroundColor: "#FFFFFF",
                alignSelf: "center",
                padding: "14px 34px",
                margin: 15,
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

Appbar.propTypes = {
  title: PropTypes.any.isRequired,
};

export default Appbar;
