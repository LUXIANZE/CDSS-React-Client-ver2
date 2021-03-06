import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListAlt from "@material-ui/icons/ListAlt";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import ShowChart from "@material-ui/icons/ShowChart";
import DeviceHub from "@material-ui/icons/DeviceHub";
import Assessment from "@material-ui/icons/Assessment";
import RecentActors from "@material-ui/icons/RecentActors";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { AppContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    backgroundImage:
      "radial-gradient(circle, #d4fbfb, #c4fafa, #b3f8f8, #a0f7f7, #8cf5f5)",
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
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (!context.user) {
      if (localStorage.getItem("user")) {
        const rawUserData = localStorage.getItem("user");
        const userData = JSON.parse(rawUserData);
        context.login(userData);
      } else {
        history.replace("/login");
      }
    }
  });

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
      <ListItem
        component={Link}
        to="/dashboard"
        button
        disabled={context.user?.role !== "ADMIN"}
      >
        <ListItemIcon>
          <ShowChart />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button onClick={onManagementClicked}>
        <ListItemIcon>
          <Assessment />
        </ListItemIcon>
        <ListItemText primary="Management" />
        {context.managementOpened ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={context.managementOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            disabled={context.user?.role !== "ADMIN"}
            className={classes.nested}
            component={Link}
            to="/decisiontreemanagement"
          >
            <ListItemIcon>
              <DeviceHub />
            </ListItemIcon>
            <ListItemText primary="Decision Tree Management" />
          </ListItem>
          <ListItem
            button
            disabled={context.user?.role !== "ADMIN"}
            className={classes.nested}
            component={Link}
            to="/cliniciansmanagement"
          >
            <ListItemIcon>
              <SupervisedUserCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Clinicians Management" />
          </ListItem>
          {/* <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/patientsmanagement"
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Patients Management" />
          </ListItem> */}
        </List>
      </Collapse>

      <ListItem button onClick={onDecisionSupportClicked}>
        <ListItemIcon>
          <AddCircleIcon />
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
              <RecentActors />
            </ListItemIcon>
            <ListItemText
              primary={`Select Patient${
                context.selectedPatient !== null
                  ? ` : ${context.selectedPatient?.name}`
                  : ""
              }`}
            />
          </ListItem>
          <ListItem
            button
            disabled={!context.selectedPatient}
            className={classes.nested}
            component={Link}
            to="/patientdetailspage"
          >
            <ListItemIcon>
              <ListAlt />
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
              <DesktopWindowsIcon />
            </ListItemIcon>
            <ListItemText primary="Decision" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default Navbar;
