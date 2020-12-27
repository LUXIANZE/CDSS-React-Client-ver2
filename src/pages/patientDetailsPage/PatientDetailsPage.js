import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Layout from "../../layout";
import { AppContext } from "../../context";
import { Form } from "../../components";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    padding: "50px 50px 0px 50px",
    overflow: "scroll",
  },
  formContent: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: 30,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
      style={{ display: "flex", flexDirection: "column", padding: "0px 24px" }}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const custom_theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#25C8C8",
    },
  },
});

const PatientDetailsPage = () => {
  const history = useHistory();
  const context = useContext(AppContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const previousBtnHandler = () => {
    const destination = value === 0 ? 0 : value - 1;
    setValue(destination);
  };
  const nextBtnHandler = () => {
    const destination = value === 2 ? 2 : value + 1;
    if (value === 2) {
      history.push("/decisionpage");
    }
    setValue(destination);
  };

  return (
    <Layout title="Patient Details Page">
      <div className={classes.container}>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            height: "fit-content",
            backgroundColor: "#F9F9F9",
            flexDirection: "column",
          }}
        >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Patient Data" />
              <Tab label="Endoscopy Report" />
              <Tab label="Histology Report" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            {context.selectedPatient ? (
              <>
                <Form title="PATIENT DEMOGRAPHICS" showEditBtn={true}>
                  <div className={classes.formContent}>
                    <Typography>MRN Number</Typography>
                    <Typography>
                      {context.selectedPatient.mRNNumber
                        ? context.selectedPatient.mRNNumber
                        : "N/A"}
                    </Typography>
                    <Typography>Date of Birth</Typography>
                    <Typography>
                      {context.selectedPatient.dateOfBirth
                        ? context.selectedPatient.dateOfBirth
                        : "N/A"}
                    </Typography>
                    <Typography>Gender</Typography>
                    <Typography>
                      {context.selectedPatient.gender
                        ? context.selectedPatient.gender
                        : "N/A"}
                    </Typography>
                    <Typography>Race</Typography>
                    <Typography>
                      {context.selectedPatient.race
                        ? context.selectedPatient.race
                        : "N/A"}
                    </Typography>
                    <Typography>Body Mass Index</Typography>
                    <Typography>
                      {context.selectedPatient.bMI
                        ? context.selectedPatient.bMI
                        : "N/A"}
                    </Typography>
                  </div>
                </Form>
                <Form title="PAST MEDICAL HISTORY" showEditBtn={true}>
                  <div className={classes.formContent}>
                    <Typography>HYPERTENSION</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.hypertension
                          ? context.selectedPatient.hypertension
                          : false
                      }
                    />
                    <Typography>ISCHAEMIC HEART DISEASE</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.ischaemicHeartDisease
                          ? context.selectedPatient.ischaemicHeartDisease
                          : false
                      }
                    />
                    <Typography>HEART FAILURE</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.heartFailure
                          ? context.selectedPatient.heartFailure
                          : false
                      }
                    />
                    <Typography>CVA/STROKE</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.cvaOrStroke
                          ? context.selectedPatient.cvaOrStroke
                          : false
                      }
                    />
                    <Typography>COPD</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.copd
                          ? context.selectedPatient.copd
                          : false
                      }
                    />
                    <Typography>IDDM</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.iddm
                          ? context.selectedPatient.iddm
                          : false
                      }
                    />
                    <Typography>NIDDM</Typography>
                    <Checkbox
                      checked={
                        context.selectedPatient.niddm
                          ? context.selectedPatient.niddm
                          : false
                      }
                    />
                  </div>
                </Form>
                <Form title="SOCIAL AND FAMILY HISTORY" showEditBtn={true}>
                  <div className={classes.formContent}>
                    <Typography>SMOKER</Typography>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="Never"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="FORMER"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="CURRENT"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="UNKNOWN"
                      />
                    </div>
                    <Typography>ALCOHOL CONSUMPTION</Typography>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="REGULAR"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="INFREQUENT"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="TEE-TOTAL"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="UNKNOWN"
                      />
                    </div>
                    <Typography>FAMILY HISTORY OF CRC</Typography>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="YES"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="NO"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="UNKNOWN"
                      />
                    </div>
                  </div>
                </Form>
                <Form title="COLONOSCOPY HISTORY" showEditBtn={true}>
                  <div className={classes.formContent}>
                    <Typography>
                      EXCLUDING THE INDEX COLONOSCOPY, HAS THE PATIENT HAD PRIOR
                      COLONOSCOPIES?
                    </Typography>
                    <div style={{ display: "flex" }}>
                      <Checkbox
                        checked={
                          context.selectedPatient.priorColonoscopy
                            ? context.selectedPatient.priorColonoscopy
                            : false
                        }
                      />
                    </div>
                    <Typography>NUMBER OF PRIOR COLONOSCOPIES</Typography>
                    <Typography>
                      {context.selectedPatient.noOfPriorColonoscopy
                        ? context.selectedPatient.noOfPriorColonoscopy
                        : "N/A"}
                    </Typography>
                    <Typography>WERE PRIOR COLONOSCOPY NORMAL?</Typography>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="YES"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="NO"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="UNKNOWN"
                      />
                    </div>
                    <Typography>
                      ABNORMALITIES IN PRIOR COLONOSCOPIES
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="ADENOMATOUS POLYPS"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="SERRATED POLYPS"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="MALIGNANT POLYPS"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="COLORECTAL CANCER"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="INFLAMMATORY BOWEL DISEASE"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="DIVERTICULAR DISEASE"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              context.selectedPatient.isSmoker
                                ? context.selectedPatient.isSmoker
                                : false
                            }
                          />
                        }
                        label="OTHER"
                      />
                    </div>
                  </div>
                </Form>
              </>
            ) : (
              "No Patient"
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {context.selectedPatient ? (
              <Form
                title="FINDINGS DURING INDEX COLONOSCOPY"
                showDocumentBtn={true}
                showEditBtn={true}
              >
                <div className={classes.formContent}>
                  <Typography>Date of index colonoscopy</Typography>
                  <Typography>
                    {context.selectedPatient.date
                      ? context.selectedPatient.date
                      : "N/A"}
                  </Typography>
                  <Typography>Quality of bowel preparation</Typography>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Excellent: Small volume of liquid; > 95% of mucosa seen"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Good: Clear liquid covering 5%-25% of mucosa, but > 90% mucosa seen"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Fair: Semisolid stool not suctioned/washed away, but > 90% mucosa seen"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Poor: Semisolid stool not suctioned/washed away and < 90% mucosa seen"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Inadequate: Repeat preparation/investigation needed"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Not stated in report"
                    />
                  </div>
                  <Typography>Location of polyp/s</Typography>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Caecum"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Ascending colon"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Transverse colon"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Descending colon"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Sigmoid colon"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Rectum"
                    />
                  </div>
                  <Typography>Number of polypsdetected</Typography>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="< =2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="3-4"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="5-10"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label=">10"
                    />
                  </div>
                  <Typography>Size of the largest polyp /mm</Typography>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="< 10"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label=">=10"
                    />
                  </div>
                  <Typography>Was the polypectomy complete?</Typography>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="No"
                    />
                  </div>
                  <Typography>
                    Was the polyp &gt;20mm and had piecemeal section?
                  </Typography>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="No"
                    />
                  </div>
                </div>
              </Form>
            ) : (
              "No patient"
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {context.selectedPatient ? (
              <Form
                title="PATIENT DEMOGRAPHICS"
                showDocumentBtn={true}
                showEditBtn={true}
              >
                <div className={classes.formContent}>
                  <Typography>Polyp type</Typography>
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Adenomatous polyp"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Serrated polyp"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Malignant polyp"
                    />
                  </div>
                  <Typography>Size of the largest polyp /mm</Typography>
                  <Typography>{"5"}</Typography>
                  <Typography>Presence of VILLOUS architecture?</Typography>
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="No"
                    />
                  </div>
                  <Typography>Presence of HIGH GRADE DYSPLESIA?</Typography>
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            context.selectedPatient.isSmoker
                              ? context.selectedPatient.isSmoker
                              : false
                          }
                        />
                      }
                      label="No"
                    />
                  </div>
                </div>
              </Form>
            ) : (
              "No patient"
            )}
          </TabPanel>
          <div
            style={{ display: "flex", flexDirection: "column", padding: 50 }}
          >
            <ThemeProvider theme={custom_theme}>
              <Button
                variant="contained"
                color="secondary"
                style={{ alignSelf: "flex-start" }}
                onClick={previousBtnHandler}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ alignSelf: "flex-end" }}
                onClick={nextBtnHandler}
              >
                Next
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetailsPage;
