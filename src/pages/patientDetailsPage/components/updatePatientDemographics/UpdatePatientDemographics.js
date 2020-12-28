import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const UpdatePatientDemographics = (props) => {
  const { open, handleClose } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update info</DialogTitle>
      <DialogContent>
        <DialogContentText>Patient Demographics</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="MRNNumber"
          type="email"
          fullWidth
        />
        <TextField autoFocus margin="dense" label="Date of Birth" fullWidth />
        <TextField
          autoFocus
          margin="dense"
          label="MRNNumber"
          type="Gender"
          fullWidth
        />
        <TextField autoFocus margin="dense" label="Race" fullWidth />
        <TextField autoFocus margin="dense" label="BMI" fullWidth />
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
          onClick={handleClose}
          color="primary"
          style={{ backgroundColor: "#25C8C8", color: "white" }}
        >
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePatientDemographics;
