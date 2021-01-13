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
import { gql, useMutation } from "@apollo/client";

import { AppContext } from "../../../../context";

const UPDATE_USER = gql`
  mutation UpdateClinician($staffId: String!, $role: String!) {
    updateClinician(staffId: $staffId, role: $role) {
      role
    }
  }
`;

const UpdateUserForm = (props) => {
  const context = useContext(AppContext);
  const { open, handleClose, selectedUser } = props;
  const [role, setRole] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);

  const [updateUser, { data, error }] = useMutation(UPDATE_USER, {
    variables: { staffId: selectedUser?.staffId, role: role },
  });

  if (data) {
    if (!updatedUser) {
      setUpdatedUser(data.updateClinician);
      if (selectedUser.staddId === context.user.staffId) {
        context.updateUserRole(data.updateClinician.role);
      }
    }
  }

  if (error) {
    console.log("selectedUser :>> ", selectedUser);
    console.log("error :>> ", error);
  }

  const handleSave = () => {
    updateUser().catch((error) => {
      console.log("error :>> ", error);
    });
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
        <DialogContentText>User Role</DialogContentText>
        <FormControl
          variant="outlined"
          style={{ minWidth: 300, width: "100%", margin: "10px 0px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
            }}
            label="Role"
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="ADMIN">Admin Role</MenuItem>
            <MenuItem value="BASE">Basic Role</MenuItem>
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

export default UpdateUserForm;
