import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { DataGrid } from "@material-ui/data-grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { gql, useQuery } from "@apollo/client";

import Layout from "../../layout";
import { UpdateUserForm } from "./components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: 50,
    overflow: "scroll",
  },
  instructions: {
    borderRadius: 15,
    padding: 20,
    height: "fit-content",
  },
});

const USERS_QUERY = gql`
  query GetUsers {
    clinicians {
      name
      staffId
      role
    }
  }
`;

const CliniciansManagementPage = () => {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(USERS_QUERY);
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  const [refetchFlag, setRefetchFlag] = useState(false);

  const handleOnRowClicked = (params) => {
    setSelectedUser(params.row);
    setRefetchFlag(false);
    if (selectedUser) {
      setShowUpdateUserForm(true);
    }
  };
  const handleCloseUpdateUserForm = () => {
    refetch();
    setShowUpdateUserForm(false);
  };

  const columns = [
    { field: "id", headerName: "No", width: 90 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "staffId", headerName: "Staff ID", width: 300 },
    { field: "role", headerName: "Role", width: 130 },
  ];

  if (data) {
    if (!refetchFlag) {
      console.log("data :>> ", data);
      let temp_users = [];
      data.clinicians.forEach((clinician, index) => {
        temp_users.push({ id: index + 1, ...clinician });
      });
      setUsers(temp_users);
      setRefetchFlag(true);
    }
  }

  if (error) {
    console.log("error :>> ", error);
  }

  return (
    <Layout title="Clinicians Management Page">
      <div className={classes.container}>
        <div style={{ height: "fit-content" }}>
          <Card className={classes.instructions} raised>
            <CardContent>
              <Typography
                component="h4"
                variant="h4"
                style={{ fontWeight: "bold" }}
              >
                Instructions
              </Typography>
              <Typography>
                • Please click on edit button to edit clinician's role
              </Typography>
              <Typography>
                • After changing your own role to a role lower than ADMIN will
                cause you to unable to access this module after changes took
                effect
              </Typography>
            </CardContent>
          </Card>
          <br />
          <div style={{ height: 400, width: "100%" }}>
            {users && (
              <>
                {loading ? (
                  <div>loading</div>
                ) : (
                  <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    onRowClick={handleOnRowClicked}
                    disableSelectionOnClick
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <UpdateUserForm
        selectedUser={selectedUser}
        open={showUpdateUserForm}
        handleClose={handleCloseUpdateUserForm}
      />
    </Layout>
  );
};

export default CliniciansManagementPage;
