import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

import { AppContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: "#B6E4E7",
    padding: 0,
    boxShadow: "5px 14px 17px 10px rgba(0,0,0,0.25)",
    height: "100%",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  linkStyle: {
    textDecoration: "none",
  },
}));

const Navbar = () => {
  const context = useContext(AppContext);
  const classes = useStyles();

  const onDecisionSupportClicked = () => {
    context.toggleDecision(!context.decisionOpened);
  };

  const onManagementClicked = () => {
    context.toggleManagement(!context.managementOpened);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem component={Link} to="/dashboard" button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button onClick={onManagementClicked}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Management" />
        {context.managementOpened ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={context.managementOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/decisiontreemanagement"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Decision Tree Management" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/cliniciansmanagement"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Clinicians Management" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/patientsmanagement"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Patients Management" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={onDecisionSupportClicked}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Decision Support" />
        {context.decisionOpened ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={context.decisionOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/decisionsupportpage"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Select Patient" />
          </ListItem>
          <ListItem
            button
            disabled={!context.selectedPatient}
            className={classes.nested}
            component={Link}
            to="/patientdetailspage"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Patient Details" />
          </ListItem>
          <ListItem
            button
            disabled={!context.selectedPatient}
            className={classes.nested}
            component={Link}
            to="/decisionpage"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Decision" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default Navbar;
