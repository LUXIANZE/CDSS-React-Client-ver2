import React, { useContext, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";

import { AppContext } from "../../../../context";
import { UPDATE_PATIENT } from "../../../../utils/graphql/UpdatePatient";
import { PatientVariableConverter } from "../../../../utils/converter";

const UpdateColonoscopyHistory = (props) => {
  const context = useContext(AppContext);
  const [updatedPatient, setUpdatedPatient] = useState(
    PatientVariableConverter(context.selectedPatient)
  );

  const [inputPriorColonoscopy, setInputPriorColonoscopy] = useState(
    context.selectedPatient.colonoscopyHistory.mRNNumber
      ? context.selectedPatient.colonoscopyHistory.mRNNumber
      : false
  );
  const [inputNoOfPriorColonoscopy, setInputNoOfPriorColonoscopy] = useState(
    context.selectedPatient.colonoscopyHistory.noOfPriorColonoscopy
      ? context.selectedPatient.colonoscopyHistory.noOfPriorColonoscopy
      : 0
  );
  const [inputIsNormal, setInputIsNormal] = useState(
    context.selectedPatient.colonoscopyHistory.isNormal
      ? context.selectedPatient.colonoscopyHistory.isNormal
      : ""
  );
  const [input1, setInput1] = useState(
    context.selectedPatient.colonoscopyHistory.abnormalities
      ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
          "ADENOMATOUS_POLYPS"
        )
      : false
  );
  const [input2, setInput2] = useState(
    context.selectedPatient.colonoscopyHistory.abnormalities
      ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
          "SERRATED_POLYPS"
        )
      : false
  );
  const [input3, setInput3] = useState(
    context.selectedPatient.colonoscopyHistory.abnormalities
      ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
          "MALIGNANT_POLYPS"
        )
      : false
  );
  const [input4, setInput4] = useState(
    context.selectedPatient.colonoscopyHistory.abnormalities
      ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
          "COLORECTAL_CANCER"
        )
      : false
  );
  const [input5, setInput5] = useState(
    context.selectedPatient.colonoscopyHistory.abnormalities
      ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
          "INFLAMMATORY_BOWEL_DISEASE"
        )
      : false
  );
  const [input6, setInput6] = useState(
    context.selectedPatient.colonoscopyHistory.abnormalities
      ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
          "DIVERTICULAR_DISEASE"
        )
      : false
  );
  const [input7, setInput7] = useState(
    context.selectedPatient.colonoscopyHistory.abnormalities
      ? context.selectedPatient.colonoscopyHistory.abnormalities.includes(
          "OTHER"
        )
      : false
  );

  const { open, handleClose } = props;
  const [updatePatientMutation, { data, error }] = useMutation(UPDATE_PATIENT, {
    variables: { UpdatePatientInput: updatedPatient },
  });

  useEffect(() => {
    let temp_updatedPatient = PatientVariableConverter(context.selectedPatient);
    temp_updatedPatient.colonoscopyHistory.priorColonoscopy = inputPriorColonoscopy;
    temp_updatedPatient.colonoscopyHistory.noOfPriorColonoscopy = inputNoOfPriorColonoscopy;
    temp_updatedPatient.colonoscopyHistory.isNormal = inputIsNormal;

    let abnormatilites_str = "";
    if (input1) abnormatilites_str += "ADENOMATOUS_POLYPS ";
    if (input2) abnormatilites_str += "SERRATED_POLYPS ";
    if (input3) abnormatilites_str += "MALIGNANT_POLYPS ";
    if (input4) abnormatilites_str += "COLORECTAL_CANCER ";
    if (input5) abnormatilites_str += "INFLAMMATORY_BOWEL_DISEASE ";
    if (input6) abnormatilites_str += "DIVERTICULAR_DISEASE ";
    if (input7) abnormatilites_str += "OTHER";

    temp_updatedPatient.colonoscopyHistory.abnormalities = abnormatilites_str;

    const formatted_variables = PatientVariableConverter(temp_updatedPatient);

    setUpdatedPatient(formatted_variables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inputPriorColonoscopy,
    inputNoOfPriorColonoscopy,
    inputIsNormal,
    input1,
    input2,
    input3,
    input4,
    input5,
    input6,
    input7,
  ]);

  const handleSave = () => {
    console.log(updatedPatient);
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
      <DialogContent>
        <DialogContentText>Colonoscopy History</DialogContentText>
        <FormControlLabel
          control={<Checkbox checked={inputPriorColonoscopy} />}
          onChange={(event) => {
            setInputPriorColonoscopy(event.target.checked);
          }}
          label="Prior Colonoscopies"
        />
        <TextField
          style={{ minWidth: 300, width: "100%", margin: "10px 0px" }}
          variant="outlined"
          type="number"
          label="Number of prior colonoscopies"
          value={inputNoOfPriorColonoscopy}
          onChange={(event) => {
            setInputNoOfPriorColonoscopy(event.target.value);
          }}
        ></TextField>
        <FormControl
          variant="outlined"
          style={{ minWidth: 300, width: "100%", margin: "10px 0px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Normal</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={inputIsNormal}
            onChange={(event) => {
              setInputIsNormal(event.target.value);
            }}
            label="Normal"
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
        <div style={{ display: "flex" }}>
          <Typography>ABNORMALITIES IN PRIOR COLONOSCOPIES</Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FormControlLabel
              control={<Checkbox checked={input1} />}
              onChange={(event) => {
                setInput1(event.target.checked);
              }}
              label="ADENOMATOUS POLYPS"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={input2}
                  onChange={(event) => {
                    setInput2(event.target.checked);
                  }}
                />
              }
              label="SERRATED POLYPS"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={input3}
                  onChange={(event) => {
                    setInput3(event.target.checked);
                  }}
                />
              }
              label="MALIGNANT POLYPS"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={input4}
                  onChange={(event) => {
                    setInput4(event.target.checked);
                  }}
                />
              }
              label="COLORECTAL CANCER"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={input5}
                  onChange={(event) => {
                    setInput5(event.target.checked);
                  }}
                />
              }
              label="INFLAMMATORY BOWEL DISEASE"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={input6}
                  onChange={(event) => {
                    setInput6(event.target.checked);
                  }}
                />
              }
              label="DIVERTICULAR DISEASE"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={input7}
                  onChange={(event) => {
                    setInput7(event.target.checked);
                  }}
                />
              }
              label="OTHER"
            />
          </div>
        </div>
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

export default UpdateColonoscopyHistory;
