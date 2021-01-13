import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import HomeWorkTwoToneIcon from "@material-ui/icons/HomeWorkTwoTone";
import { gql, useMutation } from "@apollo/client";
import { Button, Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { AppContext } from "../../context";

const LOGIN = gql`
  mutation Login($staffId: String!, $password: String!) {
    login(staffId: $staffId, password: $password) {
      staffId
      token
      name
      role
    }
  }
`;

const SIGNUP = gql`
  mutation addClinician($registerInput: RegisterInput) {
    addClinician(registerInput: $registerInput) {
      staffId
      token
      name
      role
    }
  }
`;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    backgroundImage:
      "radial-gradient(circle, #caf8f8, #a7e0e0, #83c9c9, #5eb2b2, #329b9b)",
    height: "100%",
  },
  middle: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  card: {
    minWidth: 700,
    width: "60%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    padding: 50,
  },
});

const LoginPage = () => {
  const { user, login } = useContext(AppContext);
  const history = useHistory();
  const classes = useStyles();
  const [isSingup, setIsSignup] = useState(false);
  const [signInInputStaffId, setSignInInputStaffId] = useState("");
  const [signInInputPassword, setSignInInputPassword] = useState("");
  const [signUpInputStaffId, setSignUpInputStaffId] = useState("");
  const [signUpInputName, setSignUpInputName] = useState("");
  const [signUpInputPassword, setSignUpInputPassword] = useState("");

  /**
   * Error states
   */
  const [loginStaffIdErr, setLoginStaffIdErr] = useState(false);
  const [loginPasswordErr, setLoginPasswordErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [staffIdErr, setStaffIdErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);

  const [open, setOpen] = useState(false);
  const [signUpInputConfirmPassword, setSignUpInputConfirmPassword] = useState(
    ""
  );
  const [gqlLogin, { data: loginData, error: loginError }] = useMutation(
    LOGIN,
    {
      variables: { staffId: signInInputStaffId, password: signInInputPassword },
    }
  );

  const [gqlSignup, { data: signupData, error: signupError }] = useMutation(
    SIGNUP,
    {
      variables: {
        registerInput: {
          name: signUpInputName,
          staffId: signUpInputStaffId,
          password: signUpInputPassword,
          confirmPassword: signUpInputConfirmPassword,
        },
      },
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginClicked = () => {
    gqlLogin().catch((e) => {
      setOpen(true);
    });
  };

  const handleSignUpClicked = () => {
    if (signUpInputPassword === signUpInputConfirmPassword) {
      gqlSignup().catch((e) => {
        setOpen(true);
      });
    }
  };

  const handleSignInStaffIdChange = (event) => {
    setSignInInputStaffId(event.target.value);
    if (event.target.value.trim() === "") {
      setLoginStaffIdErr(true);
    } else {
      setLoginStaffIdErr(false);
    }
  };

  const handleSignInPasswordChange = (event) => {
    setSignInInputPassword(event.target.value);
    if (event.target.value === "") {
      setLoginPasswordErr(true);
    } else {
      setLoginPasswordErr(false);
    }
  };

  const handleSignUpNameChange = (event) => {
    setSignUpInputName(event.target.value);
    if (event.target.value.trim() === "") {
      setNameErr(true);
    } else {
      setNameErr(false);
    }
  };

  const handleSignUpStaffIdChange = (event) => {
    setSignUpInputStaffId(event.target.value);
    if (event.target.value.trim() === "") {
      setStaffIdErr(true);
    } else {
      setStaffIdErr(false);
    }
  };

  const handleSignUpPasswordChange = (event) => {
    setSignUpInputPassword(event.target.value);
    if (event.target.value.length < 6) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
  };

  const handleSignUpConfirmPasswordChange = (event) => {
    setSignUpInputConfirmPassword(event.target.value);
    if (event.target.value !== signUpInputPassword) {
      setConfirmPasswordErr(true);
    } else {
      setConfirmPasswordErr(false);
    }
  };

  if (loginData) {
    const { login: clinician } = loginData;
    if (!user) {
      login(clinician);
    }
  }
  if (signupData) {
    const { addClinician: clinician } = signupData;
    if (!user) {
      login(clinician);
    }
  }
  if (loginError) {
    console.log(loginError);
  }
  if (signupError) {
    console.log(signupError);
  }

  if (user) history.replace("/dashboard");

  return (
    <div className={classes.container}>
      <div className={classes.middle}>
        <div style={{ display: "flex", flexGrow: 1, alignSelf: "center" }}>
          {isSingup ? (
            <Card className={classes.card} raised>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                }}
              >
                <Card
                  style={{
                    alignSelf: "center",
                    margin: 10,
                    padding: 20,
                    borderRadius: 200,
                  }}
                  raised
                >
                  <HomeWorkTwoToneIcon
                    style={{ alignSelf: "center", fontSize: 100 }}
                    variant="outlined"
                  />
                </Card>
                <Typography
                  style={{
                    alignSelf: "center",
                    color: "#25C8C8",
                    fontSize: 30,
                  }}
                >
                  CLINICAL DECISION SUPPORT SYSTEM
                </Typography>
                <TextField
                  error={nameErr}
                  helperText={nameErr ? "Name cannot be blank" : ""}
                  label="Name"
                  variant="outlined"
                  style={{ flexGrow: 1, minHeight: 80 }}
                  value={signUpInputName}
                  onChange={handleSignUpNameChange}
                />

                <TextField
                  error={staffIdErr}
                  helperText={staffIdErr ? "No staff ID provided" : ""}
                  label="Staff ID"
                  variant="outlined"
                  style={{ flexGrow: 1, minHeight: 80 }}
                  value={signUpInputStaffId}
                  onChange={handleSignUpStaffIdChange}
                />

                <TextField
                  error={passwordErr}
                  helperText={
                    passwordErr ? "Password must be at least 6 characters" : ""
                  }
                  label="Password"
                  variant="outlined"
                  type="password"
                  style={{ flexGrow: 1, minHeight: 80 }}
                  value={signUpInputPassword}
                  onChange={handleSignUpPasswordChange}
                />

                <TextField
                  error={confirmPasswordErr}
                  helperText={
                    confirmPasswordErr
                      ? "Confirm password not the same as password"
                      : ""
                  }
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  style={{ flexGrow: 1, minHeight: 80 }}
                  value={signUpInputConfirmPassword}
                  onChange={handleSignUpConfirmPasswordChange}
                />

                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#FFFCFC",
                      color: "#2C5B59",
                      padding: "14px 34px",
                    }}
                    onClick={handleSignUpClicked}
                  >
                    SIGN UP
                  </Button>
                  <span style={{ width: 20 }} />
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#FFFCFC",
                      color: "#2C5B59",
                      padding: "14px 34px",
                    }}
                    onClick={() => setIsSignup(false)}
                  >
                    BACK TO LOGIN
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className={classes.card} raised>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                }}
              >
                <Card
                  style={{
                    alignSelf: "center",
                    margin: 10,
                    padding: 20,
                    borderRadius: 200,
                  }}
                  raised
                >
                  <HomeWorkTwoToneIcon
                    style={{ alignSelf: "center", fontSize: 100 }}
                    variant="outlined"
                  />
                </Card>
                <Typography
                  style={{
                    alignSelf: "center",
                    color: "#25C8C8",
                    fontSize: 30,
                  }}
                >
                  CLINICAL DECISION SUPPORT SYSTEM
                </Typography>
                <TextField
                  error={loginStaffIdErr}
                  helperText={loginStaffIdErr ? "Staff ID cannot be blank" : ""}
                  label="Staff ID"
                  variant="outlined"
                  style={{ flexGrow: 1, minHeight: 80 }}
                  value={signInInputStaffId}
                  onChange={handleSignInStaffIdChange}
                />

                <TextField
                  error={loginPasswordErr}
                  helperText={
                    loginPasswordErr ? "Password cannot be blank" : ""
                  }
                  label="Password"
                  variant="outlined"
                  type="password"
                  style={{ flexGrow: 1, minHeight: 80 }}
                  value={signInInputPassword}
                  onChange={handleSignInPasswordChange}
                />

                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#FFFCFC",
                      color: "#2C5B59",
                      padding: "14px 34px",
                    }}
                    onClick={handleLoginClicked}
                  >
                    LOGIN
                  </Button>
                  <span style={{ width: 20 }} />
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#FFFCFC",
                      color: "#2C5B59",
                      padding: "14px 34px",
                    }}
                    onClick={() => setIsSignup(true)}
                  >
                    SIGN UP
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          isSingup
            ? "Invalid Signup credentials"
            : "Invalid Login credentials, please check your staffId and password"
        }
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default LoginPage;
