import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { gql, useMutation } from "@apollo/client";

import { AppContext } from "../../context";
import { Button } from "@material-ui/core";

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
    backgroundColor: "#25C8C8",
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

  const handleLoginClicked = () => {
    gqlLogin().catch((e) => {
      alert(e);
    });
  };

  const handleSignUpClicked = () => {
    if (signUpInputPassword === signUpInputConfirmPassword) {
      gqlSignup().catch((e) => {
        alert(e);
      });
    } else {
      alert("Password and confirm password not the same");
    }
  };

  const handleSignInStaffIdChange = (event) => {
    setSignInInputStaffId(event.target.value);
  };

  const handleSignInPasswordChange = (event) => {
    setSignInInputPassword(event.target.value);
  };

  const handleSignUpNameChange = (event) => {
    setSignUpInputName(event.target.value);
  };

  const handleSignUpStaffIdChange = (event) => {
    setSignUpInputStaffId(event.target.value);
  };

  const handleSignUpPasswordChange = (event) => {
    setSignUpInputPassword(event.target.value);
  };

  const handleSignUpConfirmPasswordChange = (event) => {
    setSignUpInputConfirmPassword(event.target.value);
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
                  backgroundColor="#FFFFFF"
                  style={{ display: "flex" }}
                  raised
                >
                  <TextField
                    label="Name"
                    variant="filled"
                    style={{ flexGrow: 1 }}
                    value={signUpInputName}
                    onChange={handleSignUpNameChange}
                  ></TextField>
                </Card>

                <span style={{ height: 20 }} />

                <Card
                  backgroundColor="#FFFFFF"
                  style={{ display: "flex" }}
                  raised
                >
                  <TextField
                    label="Staff ID"
                    variant="filled"
                    style={{ flexGrow: 1 }}
                    value={signUpInputStaffId}
                    onChange={handleSignUpStaffIdChange}
                  ></TextField>
                </Card>

                <span style={{ height: 20 }} />

                <Card
                  backgroundColor="#FFFFFF"
                  style={{ display: "flex" }}
                  raised
                >
                  <TextField
                    label="Password"
                    variant="filled"
                    style={{ flexGrow: 1 }}
                    value={signUpInputPassword}
                    onChange={handleSignUpPasswordChange}
                  ></TextField>
                </Card>

                <span style={{ height: 20 }} />
                <Card
                  backgroundColor="#FFFFFF"
                  style={{ display: "flex" }}
                  raised
                >
                  <TextField
                    label="Confirm Password"
                    variant="filled"
                    style={{ flexGrow: 1 }}
                    value={signUpInputConfirmPassword}
                    onChange={handleSignUpConfirmPasswordChange}
                  ></TextField>
                </Card>
                <span style={{ height: 20 }} />
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <Button
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
                  backgroundColor="#FFFFFF"
                  style={{ display: "flex" }}
                  raised
                >
                  <TextField
                    label="Staff ID"
                    variant="filled"
                    style={{ flexGrow: 1 }}
                    value={signInInputStaffId}
                    onChange={handleSignInStaffIdChange}
                  ></TextField>
                </Card>

                <span style={{ height: 20 }} />
                <Card
                  backgroundColor="#FFFFFF"
                  style={{ display: "flex" }}
                  raised
                >
                  <TextField
                    label="Password"
                    variant="filled"
                    style={{ flexGrow: 1 }}
                    value={signInInputPassword}
                    onChange={handleSignInPasswordChange}
                  ></TextField>
                </Card>
                <span style={{ height: 20 }} />
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <Button
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
    </div>
  );
};

export default LoginPage;
