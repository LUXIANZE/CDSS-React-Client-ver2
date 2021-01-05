import React, { useContext, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useMutation } from "@apollo/client";

import { AppContext } from "../../../../context";
import { UPDATE_PATIENT } from "../../../../utils/graphql/UpdatePatient";
import { PatientVariableConverter } from "../../../../utils/converter";

const UpdateEndoscopyReport = (props) => {
  const context = useContext(AppContext);
  const [updatedPatient, setUpdatedPatient] = useState(
    PatientVariableConverter(context.selectedPatient)
  );
  const [inputMRNNumber, setInputMRNNumber] = useState(
    context.selectedPatient.patientDemographics.mRNNumber
      ? context.selectedPatient.patientDemographics.mRNNumber
      : ""
  );
  const [inputDateOfBirth, setInputDateOfBirth] = useState(
    context.selectedPatient.patientDemographics.dateOfBirth
      ? context.selectedPatient.patientDemographics.dateOfBirth
      : ""
  );
  const [inputGender, setInputGender] = useState(
    context.selectedPatient.patientDemographics.gender
      ? context.selectedPatient.patientDemographics.gender
      : ""
  );
  const [inputRace, setInputRace] = useState(
    context.selectedPatient.patientDemographics.race
      ? context.selectedPatient.patientDemographics.race
      : ""
  );
  const [inputBMI, setInputBMI] = useState(
    context.selectedPatient.patientDemographics.bMI
      ? context.selectedPatient.patientDemographics.bMI
      : ""
  );
  const { open, handleClose } = props;
  const [updatePatientMutation, { data, error }] = useMutation(UPDATE_PATIENT, {
    variables: { UpdatePatientInput: updatedPatient },
  });

  useEffect(() => {
    let temp_updatedPatient = PatientVariableConverter(context.selectedPatient);
    temp_updatedPatient.patientDemographics.mRNNumber = inputMRNNumber;
    temp_updatedPatient.patientDemographics.gender = inputGender;
    temp_updatedPatient.patientDemographics.dateOfBirth = inputDateOfBirth;
    temp_updatedPatient.patientDemographics.race = inputRace;
    temp_updatedPatient.patientDemographics.bMI = inputBMI;
    const formatted_variables = PatientVariableConverter(temp_updatedPatient);

    setUpdatedPatient(formatted_variables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputMRNNumber, inputGender, inputDateOfBirth, inputRace, inputBMI]);

  const handleSave = () => {
    updatePatientMutation().catch((e) => {
      console.log(e);
    });
    setUpdatedPatient(null);
    handleClose();
  };

  if (error) {
    console.log(error);
  }

  if (data) {
    const { updatePatient } = data;
    if (!updatedPatient) {
      context.selectPatient(updatePatient);
      setUpdatedPatient(PatientVariableConverter(updatePatient));
    }
  }

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

export default UpdateEndoscopyReport;
