import React, { useContext, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";

import { AppContext } from "../../../../context";
import { UPDATE_PATIENT } from "../../../../utils/graphql/UpdatePatient";
import { PatientVariableConverter } from "../../../../utils/converter";

const UpdateHistologyReport = (props) => {
  const context = useContext(AppContext);
  const [updatedPatient, setUpdatedPatient] = useState(
    PatientVariableConverter(context.selectedPatient)
  );

  const [inputPolypType, setInputPolypType] = useState(
    context.selectedPatient.histologyReport.polypType
      ? context.selectedPatient.histologyReport.polypType
      : ""
  );
  const [inputSizeOfLargestPolyp, setInputSizeOfLargestPolyp] = useState(
    context.selectedPatient.histologyReport.sizeOfLargestPolyp
      ? context.selectedPatient.histologyReport.sizeOfLargestPolyp
      : 0.0
  );
  const [inputVillousArchitecture, setInputVillousArchitecture] = useState(
    context.selectedPatient.histologyReport.villousArchitecture
      ? context.selectedPatient.histologyReport.villousArchitecture
      : false
  );
  const [inputHighGradeDysplasia, setInputHighGradeDysplasia] = useState(
    context.selectedPatient.histologyReport.highGradeDysplasia
      ? context.selectedPatient.histologyReport.highGradeDysplasia
      : false
  );

  const { open, handleClose } = props;
  const [updatePatientMutation, { data, error }] = useMutation(UPDATE_PATIENT, {
    variables: { UpdatePatientInput: updatedPatient },
  });

  useEffect(() => {
    let temp_updatedPatient = PatientVariableConverter(context.selectedPatient);
    temp_updatedPatient.histologyReport.polypType = inputPolypType;
    temp_updatedPatient.histologyReport.sizeOfLargestPolyp = inputSizeOfLargestPolyp;
    temp_updatedPatient.histologyReport.villousArchitecture = inputVillousArchitecture;
    temp_updatedPatient.histologyReport.highGradeDysplasia = inputHighGradeDysplasia;
    const formatted_variables = PatientVariableConverter(temp_updatedPatient);

    setUpdatedPatient(formatted_variables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inputPolypType,
    inputSizeOfLargestPolyp,
    inputVillousArchitecture,
    inputHighGradeDysplasia,
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
          style={{ minWidth: 300, width: "100%", margin: "10px 0px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Polyp type
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={inputPolypType}
            onChange={(event) => {
              setInputPolypType(event.target.value);
            }}
            label="Polyp type"
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="Adenomatous polyp">Adenomatous polyp</MenuItem>
            <MenuItem value="Serrated polyp">Serrated polyp</MenuItem>
            <MenuItem value="Malignant polyp">Malignant polyp</MenuItem>
          </Select>
        </FormControl>
        <TextField
          style={{ minWidth: 300, width: "100%", margin: "10px 0px" }}
          variant="outlined"
          type="number"
          label="Size of the largest polyp /mm"
          value={inputSizeOfLargestPolyp}
          onChange={(event) => {
            setInputSizeOfLargestPolyp(event.target.value);
          }}
        ></TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={inputVillousArchitecture}
              onChange={(event) => {
                setInputVillousArchitecture(event.target.checked);
              }}
            />
          }
          label="Presence of VILLOUS architecture?"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={inputHighGradeDysplasia}
              onChange={(event) => {
                setInputHighGradeDysplasia(event.target.checked);
              }}
            />
          }
          label="Presence of HIGH GRADE DYSPLESIA?"
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

export default UpdateHistologyReport;
