import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";

import { AppContext } from "../../../../context";
import { useHistory } from "react-router-dom";

const OverrideDecisionForm = (props) => {
  const context = useContext(AppContext);
  const history = useHistory();
  const {
    open,
    handleClose,
    reason,
    setReason,
    mutation,
    nextVisit,
    setNextVisit,
  } = props;

  const handleOverride = () => {
    if (reason.trim().length === 0) {
      alert("Invalid Reason");
    } else {
      mutation();
      context.selectPatient(null);
      history.push("./decisionsupportpage");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Override Decision</DialogTitle>
      <DialogContent>
        <DialogContentText>Overriding Details</DialogContentText>
        <FormControl
          variant="outlined"
          style={{ minWidth: 300, width: "100%", margin: "10px 0px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Overriding Decision
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={nextVisit}
            onChange={(event) => {
              setNextVisit(event.target.value);
            }}
            label="Overriding Decision"
          >
            <MenuItem value={"3 Months"}>3 Months</MenuItem>
            <MenuItem value={"6 Months"}>6 Months</MenuItem>
            <MenuItem value={"1 Year"}>1 Year</MenuItem>
            <MenuItem value={"3 Years"}>3 Years</MenuItem>
            <MenuItem value={"5 Years"}>5 Years</MenuItem>
            <MenuItem value={"7 Years"}>7 Years</MenuItem>
            <MenuItem value={"10 Years"}>10 Years</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="Overriding Reason"
          multiline
          rows={5}
          variant="outlined"
          value={reason}
          onChange={(event) => {
            setReason(event.target.value);
          }}
          style={{ margin: "10px 0px", width: "100%" }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          style={{ backgroundColor: "#FF8888", color: "white" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleOverride}
          color="primary"
          style={{ backgroundColor: "#25C8C8", color: "white" }}
        >
          Override
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OverrideDecisionForm;
