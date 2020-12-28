import React, { useContext, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

import { AppContext } from "../../../../context";

const UpdatePatientDemographics = (props) => {
  const context = useContext(AppContext);
  const [inputMRNNumber, setInputMRNNumber] = useState(
    context.selectedPatient.mRNNumber ? context.selectedPatient.mRNNumber : ""
  );
  const [inputDateOfBirth, setInputDateOfBirth] = useState(
    context.selectedPatient.dateOfBirth
      ? context.selectedPatient.dateOfBirth
      : ""
  );
  const [inputGender, setInputGender] = useState(
    context.selectedPatient.gender ? context.selectedPatient.gender : ""
  );
  const [inputRace, setInputRace] = useState(
    context.selectedPatient.race ? context.selectedPatient.race : ""
  );
  const [inputBMI, setInputBMI] = useState(
    context.selectedPatient.bMI ? context.selectedPatient.bMI : ""
  );
  const { open, handleClose } = props;

  const handleSave = () => {
    const updatedPatient = { ...context.selectedPatient };
    updatedPatient.mRNNumber = inputMRNNumber;
    updatedPatient.gender = inputGender;
    updatedPatient.dateOfBirth = inputDateOfBirth;
    updatedPatient.race = inputRace;
    updatedPatient.bMI = inputBMI;
    context.selectPatient(updatedPatient);
    handleClose();
  };
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
          fullWidth
          value={inputMRNNumber}
          onChange={(event) => {
            setInputMRNNumber(event.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Date of Birth"
          fullWidth
          value={inputDateOfBirth}
          onChange={(event) => {
            setInputDateOfBirth(event.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Gender"
          fullWidth
          value={inputGender}
          onChange={(event) => {
            setInputGender(event.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Race"
          fullWidth
          value={inputRace}
          onChange={(event) => {
            setInputRace(event.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          label="BMI"
          fullWidth
          value={inputBMI}
          onChange={(event) => {
            setInputBMI(event.target.value);
          }}
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
          onClick={handleSave}
          color="primary"
          style={{ backgroundColor: "#25C8C8", color: "white" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePatientDemographics;
