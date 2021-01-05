import React, { useContext, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";

import { AppContext } from "../../../../context";
import { UPDATE_PATIENT } from "../../../../utils/graphql/UpdatePatient";
import { PatientVariableConverter } from "../../../../utils/converter";

const UpdateSocialAndFamilyHistory = (props) => {
  const context = useContext(AppContext);
  const [updatedPatient, setUpdatedPatient] = useState(
    PatientVariableConverter(context.selectedPatient)
  );

  const [inputIsSmoker, setInputIsSmoker] = useState(
    context.selectedPatient.socialAndFamilyHistory.isSmoker
      ? context.selectedPatient.socialAndFamilyHistory.isSmoker
      : ""
  );
  const [inputAlcoholConsumption, setInputAlcoholConsumption] = useState(
    context.selectedPatient.socialAndFamilyHistory.alcoholConsumption
      ? context.selectedPatient.socialAndFamilyHistory.alcoholConsumption
      : ""
  );
  const [inputFamilyCRCHistory, setInputFamilyCRCHistory] = useState(
    context.selectedPatient.socialAndFamilyHistory.familyCRCHistory
      ? context.selectedPatient.socialAndFamilyHistory.familyCRCHistory
      : ""
  );

  const { open, handleClose } = props;
  const [updatePatientMutation, { data, error }] = useMutation(UPDATE_PATIENT, {
    variables: { UpdatePatientInput: updatedPatient },
  });

  useEffect(() => {
    let temp_updatedPatient = PatientVariableConverter(context.selectedPatient);
    temp_updatedPatient.socialAndFamilyHistory.isSmoker = inputIsSmoker;
    temp_updatedPatient.socialAndFamilyHistory.alcoholConsumption = inputAlcoholConsumption;
    temp_updatedPatient.socialAndFamilyHistory.familyCRCHistory = inputFamilyCRCHistory;
    const formatted_variables = PatientVariableConverter(temp_updatedPatient);

    setUpdatedPatient(formatted_variables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputIsSmoker, inputAlcoholConsumption, inputFamilyCRCHistory]);

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
        <FormControl
          variant="outlined"
          style={{ minWidth: 300, width: "100%", margin: 10 }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Smoker</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={inputIsSmoker}
            onChange={(event) => {
              setInputIsSmoker(event.target.value);
            }}
            label="Smoker"
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Current">Current</MenuItem>
            <MenuItem value="Unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          style={{ minWidth: 300, width: "100%", margin: 10 }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Alcohol Consumption
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={inputAlcoholConsumption}
            onChange={(event) => {
              setInputAlcoholConsumption(event.target.value);
            }}
            label="Alcohol Consumption"
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="Regular">Regular</MenuItem>
            <MenuItem value="Infrequent">Infrequent</MenuItem>
            <MenuItem value="Tee-total">Tee-total</MenuItem>
            <MenuItem value="Unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          style={{ minWidth: 300, width: "100%", margin: 10 }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Family History of CRC
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={inputFamilyCRCHistory}
            onChange={(event) => {
              setInputFamilyCRCHistory(event.target.value);
            }}
            label="Family History of CRC"
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
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

export default UpdateSocialAndFamilyHistory;
