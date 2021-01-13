import React, { useContext, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { useMutation } from "@apollo/client";

import { AppContext } from "../../../../context";
import { UPDATE_PATIENT } from "../../../../utils/graphql/UpdatePatient";
import { PatientVariableConverter } from "../../../../utils/converter";

const UpdatePastMedicalHistory = (props) => {
  const context = useContext(AppContext);
  const [updatedPatient, setUpdatedPatient] = useState(
    PatientVariableConverter(context.selectedPatient)
  );

  const [inputHypertension, setInputHypertension] = useState(
    context.selectedPatient.pastMedicalHistory.hypertension
      ? context.selectedPatient.pastMedicalHistory.hypertension
      : false
  );
  const [inputIschaemicHeartDisease, setInputIschaemicHeartDisease] = useState(
    context.selectedPatient.pastMedicalHistory.ischaemicHeartDisease
      ? context.selectedPatient.pastMedicalHistory.ischaemicHeartDisease
      : false
  );
  const [inputHeartFailure, setInputHeartFailure] = useState(
    context.selectedPatient.pastMedicalHistory.heartFailure
      ? context.selectedPatient.pastMedicalHistory.heartFailure
      : false
  );
  const [inputcvaOrStroke, setInputcvaOrStroke] = useState(
    context.selectedPatient.pastMedicalHistory.cvaOrStroke
      ? context.selectedPatient.pastMedicalHistory.cvaOrStroke
      : false
  );
  const [inputCopd, setInputCopd] = useState(
    context.selectedPatient.pastMedicalHistory.copd
      ? context.selectedPatient.pastMedicalHistory.copd
      : false
  );
  const [inputIddm, setInputIddm] = useState(
    context.selectedPatient.pastMedicalHistory.iddm
      ? context.selectedPatient.pastMedicalHistory.iddm
      : false
  );
  const [inputNiddm, setInputNiddm] = useState(
    context.selectedPatient.pastMedicalHistory.niddm
      ? context.selectedPatient.pastMedicalHistory.niddm
      : false
  );

  const { open, handleClose } = props;
  const [updatePatientMutation, { data, error }] = useMutation(UPDATE_PATIENT, {
    variables: { UpdatePatientInput: updatedPatient },
  });

  useEffect(() => {
    let temp_updatedPatient = PatientVariableConverter(context.selectedPatient);
    temp_updatedPatient.pastMedicalHistory.hypertension = inputHypertension;
    temp_updatedPatient.pastMedicalHistory.ischaemicHeartDisease = inputIschaemicHeartDisease;
    temp_updatedPatient.pastMedicalHistory.heartFailure = inputHeartFailure;
    temp_updatedPatient.pastMedicalHistory.cvaOrStroke = inputcvaOrStroke;
    temp_updatedPatient.pastMedicalHistory.copd = inputCopd;
    temp_updatedPatient.pastMedicalHistory.iddm = inputIddm;
    temp_updatedPatient.pastMedicalHistory.niddm = inputNiddm;
    const formatted_variables = PatientVariableConverter(temp_updatedPatient);

    setUpdatedPatient(formatted_variables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inputHypertension,
    inputIschaemicHeartDisease,
    inputHeartFailure,
    inputcvaOrStroke,
    inputCopd,
    inputIddm,
    inputNiddm,
  ]);

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
      localStorage.setItem(
        "CDSS-Selected-Patient",
        JSON.stringify(updatePatient)
      );
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
      <DialogContent
        style={{
          width: "35%",
          minWidth: 400,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DialogContentText>Past Medical History</DialogContentText>
        <FormControlLabel
          control={
            <Checkbox
              checked={inputHypertension}
              onChange={(event) => {
                setInputHypertension(event.target.checked);
              }}
            />
          }
          label="Hypertension"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={inputIschaemicHeartDisease}
              onChange={(event) => {
                setInputIschaemicHeartDisease(event.target.checked);
              }}
            />
          }
          label="Ischaemic Heart Disease"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={inputHeartFailure}
              onChange={(event) => {
                setInputHeartFailure(event.target.checked);
              }}
            />
          }
          label="Heart Failure"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={inputcvaOrStroke}
              onChange={(event) => {
                setInputcvaOrStroke(event.target.checked);
              }}
            />
          }
          label="CVA/Stroke"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={inputCopd}
              onChange={(event) => {
                setInputCopd(event.target.checked);
              }}
            />
          }
          label="COPD"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={inputIddm}
              onChange={(event) => {
                setInputIddm(event.target.checked);
              }}
            />
          }
          label="IDDM"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={inputNiddm}
              onChange={(event) => {
                setInputNiddm(event.target.checked);
              }}
            />
          }
          label="NIDDM"
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

export default UpdatePastMedicalHistory;
