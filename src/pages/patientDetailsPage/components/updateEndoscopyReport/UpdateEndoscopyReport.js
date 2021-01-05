import React, { useContext, useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
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
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useMutation } from "@apollo/client";

import { AppContext } from "../../../../context";
import { UPDATE_PATIENT } from "../../../../utils/graphql/UpdatePatient";
import { PatientVariableConverter } from "../../../../utils/converter";

const UpdateEndoscopyReport = (props) => {
  const context = useContext(AppContext);
  const [updatedPatient, setUpdatedPatient] = useState(
    PatientVariableConverter(context.selectedPatient)
  );

  const [inputDate, setInputDate] = useState(
    context.selectedPatient.endoscopyReport.date
      ? context.selectedPatient.endoscopyReport.date
      : new Date().toDateString()
  );
  const [inputQualityOfPreparation, setInputQualityOfPreparation] = useState(
    context.selectedPatient.endoscopyReport.qualityOfPreparation
      ? context.selectedPatient.endoscopyReport.qualityOfPreparation
      : ""
  );
  const [inputNoOfPolyps, setInputNoOfPolyps] = useState(
    context.selectedPatient.endoscopyReport.noOfPolyps
      ? context.selectedPatient.endoscopyReport.noOfPolyps
      : ""
  );
  const [inputSizeOfLargestPolyp, setInputSizeOfLargestPolyp] = useState(
    context.selectedPatient.endoscopyReport.sizeOfLargestPolyp
      ? context.selectedPatient.endoscopyReport.sizeOfLargestPolyp
      : ""
  );
  const [inputPolypectomyComplete, setInputPolypectomyComplete] = useState(
    context.selectedPatient.endoscopyReport.polypectomyComplete
      ? context.selectedPatient.endoscopyReport.polypectomyComplete
      : false
  );
  const [inputPiecemalResection, setInputPiecemalResection] = useState(
    context.selectedPatient.endoscopyReport.piecemalResection
      ? context.selectedPatient.endoscopyReport.piecemalResection
      : false
  );
  const [input1, setInput1] = useState(
    context.selectedPatient.endoscopyReport.locationOfPolyps
      ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
          "CAECUM"
        )
      : false
  );
  const [input2, setInput2] = useState(
    context.selectedPatient.endoscopyReport.locationOfPolyps
      ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
          "ASCENDING_COLON"
        )
      : false
  );
  const [input3, setInput3] = useState(
    context.selectedPatient.endoscopyReport.locationOfPolyps
      ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
          "TRANSVERSE_COLON"
        )
      : false
  );
  const [input4, setInput4] = useState(
    context.selectedPatient.endoscopyReport.locationOfPolyps
      ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
          "DESCENDING_COLON"
        )
      : false
  );
  const [input5, setInput5] = useState(
    context.selectedPatient.endoscopyReport.locationOfPolyps
      ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
          "SIGMOID_COLON"
        )
      : false
  );
  const [input6, setInput6] = useState(
    context.selectedPatient.endoscopyReport.locationOfPolyps
      ? context.selectedPatient.endoscopyReport.locationOfPolyps.includes(
          "RECTUM"
        )
      : false
  );

  const { open, handleClose } = props;
  const [updatePatientMutation, { data, error }] = useMutation(UPDATE_PATIENT, {
    variables: { UpdatePatientInput: updatedPatient },
  });

  useEffect(() => {
    let temp_updatedPatient = PatientVariableConverter(context.selectedPatient);
    temp_updatedPatient.endoscopyReport.date = inputDate;
    temp_updatedPatient.endoscopyReport.qualityOfPreparation = inputQualityOfPreparation;
    temp_updatedPatient.endoscopyReport.noOfPolyps = inputNoOfPolyps;
    temp_updatedPatient.endoscopyReport.sizeOfLargestPolyp = inputSizeOfLargestPolyp;
    temp_updatedPatient.endoscopyReport.polypectomyComplete = inputPolypectomyComplete;
    temp_updatedPatient.endoscopyReport.piecemalResection = inputPiecemalResection;

    let locationOfPolyps_str = "";
    if (input1) locationOfPolyps_str += "CAECUM ";
    if (input2) locationOfPolyps_str += "ASCENDING_COLON ";
    if (input3) locationOfPolyps_str += "TRANSVERSE_COLON ";
    if (input4) locationOfPolyps_str += "DESCENDING_COLON ";
    if (input5) locationOfPolyps_str += "SIGMOID_COLON ";
    if (input6) locationOfPolyps_str += "RECTUM ";

    temp_updatedPatient.endoscopyReport.locationOfPolyps = locationOfPolyps_str;

    const formatted_variables = PatientVariableConverter(temp_updatedPatient);

    setUpdatedPatient(formatted_variables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inputDate,
    inputQualityOfPreparation,
    inputNoOfPolyps,
    inputSizeOfLargestPolyp,
    inputPolypectomyComplete,
    inputPiecemalResection,
    input1,
    input2,
    input3,
    input4,
    input5,
    input6,
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
      <DialogContent style={{ minWidth: 500, width: "50%" }}>
        <DialogContentText>Endoscopy Report</DialogContentText>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date of index colonoscopy"
            value={inputDate}
            onChange={(date) => {
              setInputDate(date.toDateString());
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <FormControl
          variant="outlined"
          style={{ minWidth: 300, width: "100%", margin: "10px 0px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Quality of bowel preparation
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={inputQualityOfPreparation}
            onChange={(event) => {
              setInputQualityOfPreparation(event.target.value);
            }}
            label="Quality of bowel preparation"
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="Excellent: Small volume of liquid; > 95% of mucosa seen">
              Excellent: Small volume of liquid; &gt; 95% of mucosa seen
            </MenuItem>
            <MenuItem value="Good: Clear liquid covering 5%-25% of mucosa, but > 90% mucosa seen">
              Good: Clear liquid covering 5%-25% of mucosa, but &gt; 90% mucosa
              seen
            </MenuItem>
            <MenuItem value="Fair: Semisolid stool not suctioned/washed away, but > 90% mucosa seen">
              Fair: Semisolid stool not suctioned/washed away, but &gt; 90%
              mucosa seen
            </MenuItem>
            <MenuItem value="Poor: Semisolid stool not suctioned/washed away and < 90% mucosa seen">
              Poor: Semisolid stool not suctioned/washed away and &#60; 90%
              mucosa seen
            </MenuItem>
            <MenuItem value="Inadequate: Repeat preparation/investigation needed">
              Inadequate: Repeat preparation/investigation needed
            </MenuItem>
            <MenuItem value="Not stated in report">
              Not stated in report
            </MenuItem>
          </Select>
        </FormControl>
        <div style={{ display: "flex" }}>
          <Typography style={{ flexGrow: 1 }}>Location of polyp/s</Typography>
          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <FormControlLabel
              control={<Checkbox checked={input1} />}
              onChange={(event) => {
                setInput1(event.target.checked);
              }}
              label="Caecum"
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
              label="Ascending colon"
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
              label="Transverse colon"
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
              label="Descending colon"
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
              label="Sigmoid colon"
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
              label="Rectum"
            />
          </div>
        </div>
        <FormControl
          variant="outlined"
          style={{ minWidth: 300, width: "100%", margin: "10px 0px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Number of polypsdetected
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={inputNoOfPolyps}
            onChange={(event) => {
              setInputNoOfPolyps(event.target.value);
            }}
            label="Number of polypsdetected"
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="< =2">&#60; =2</MenuItem>
            <MenuItem value="3-4">3-4</MenuItem>
            <MenuItem value="5-10">5-10</MenuItem>
            <MenuItem value=">10">&gt;10</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          style={{ minWidth: 300, width: "100%", margin: "10px 0px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Size of the largest polyp /mm
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={inputSizeOfLargestPolyp}
            onChange={(event) => {
              setInputSizeOfLargestPolyp(event.target.value);
            }}
            label="Size of the largest polyp /mm"
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="< 10">&#60; 10</MenuItem>
            <MenuItem value=">= 10">&gt;= 10</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={inputPolypectomyComplete}
              onChange={(event) => {
                setInputPolypectomyComplete(event.target.checked);
              }}
            />
          }
          label="Was the polypectomy complete?"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={inputPiecemalResection}
              onChange={(event) => {
                setInputPiecemalResection(event.target.checked);
              }}
            />
          }
          label="Was the polyp >20mm and had piecemeal section?"
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
