import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "30px 0px",
  },
  formHeaderStyle: {
    display: "flex",
    background: "#25C8C8",
    boxShadow: "0px 4px 6px 1px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    padding: "18px 24px",
  },
  formBodyStyle: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)",
    borderRadius: "0px 0px 10px 10px",
  },
  formChildStyle: {
    padding: "30px 44px",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: "#25C8C8",
    },
  },
});

const Form = (props) => {
  const {
    title,
    showDocumentBtn,
    showEditBtn,
    documentBtnHandler,
    editBtnHandler,
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.formHeaderStyle}>
        <Typography style={{ alignSelf: "center" }}>{title}</Typography>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          {showDocumentBtn && (
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "#FFFCFC",
                  color: "#2C5B59",
                }}
              >
                Document
              </Button>
            </ThemeProvider>
          )}
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", paddingLeft: 10 }}
        >
          {showEditBtn && (
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "#FFFCFC",
                  color: "#2C5B59",
                }}
                onClick={editBtnHandler && editBtnHandler}
              >
                Edit
              </Button>
            </ThemeProvider>
          )}
        </div>
      </div>
      <div className={classes.formBodyStyle}>
        <div className={classes.formChildStyle}>{props.children}</div>
      </div>
    </div>
  );
};

export default Form;
