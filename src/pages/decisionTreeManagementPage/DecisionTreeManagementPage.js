import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

import Layout from "../../layout";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "@material-ui/core";

const GET_DECISION_TREES = gql`
  query {
    getDecisionTree
  }
`;
const UPDATE_DECISION_TREE = gql`
  mutation UpdateDecisionTree($tree: String!) {
    updateDecisionTree(tree: $tree)
  }
`;
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
});

const DecisionTreeManagementPage = () => {
  const classes = useStyles();
  const [decisionTree, setDecisionTree] = useState({});
  const { data: decisionTreeFetched } = useQuery(GET_DECISION_TREES, {
    pollInterval: 1000 * 60 * 60,
  });
  const [updateDecisionTree, { data: updateDecisonTreeResult }] = useMutation(
    UPDATE_DECISION_TREE,
    {
      variables: {
        tree: JSON.stringify(decisionTree),
      },
      onCompleted: () => {
        alert("Successfully updated");
      },
    }
  );

  useEffect(() => {
    if (decisionTreeFetched.hasOwnProperty("getDecisionTree")) {
      const stringified_decision_trees = JSON.parse(
        decisionTreeFetched.getDecisionTree
      );
      setDecisionTree(
        stringified_decision_trees.filter(
          (tree) => tree.name === "COLONOSCOPY_SURVEILLANCE"
        )[0]
      );
    }
  }, [decisionTreeFetched]);

  const handleUpdateTreeClicked = () => {
    updateDecisionTree().catch();
  };

  return (
    <Layout title="Decision Tree Management Page">
      <div className={classes.container}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            margin: 50,
          }}
        >
          <div style={{ alignSelf: "center", width: "100%", height: "95%" }}>
            <JSONInput
              width="100%"
              height="100%"
              placeholder={decisionTree}
              onChange={(content) => {
                setDecisionTree(content.jsObject);
              }}
              locale={locale}
            />
          </div>
          <div style={{ flexGrow: 1, margin: 20 }}>
            <Button
              style={{
                backgroundColor: "#25C8C8",
                color: "#FFFFFF",
                alignSelf: "center",
              }}
              onClick={handleUpdateTreeClicked}
            >
              Update Tree
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DecisionTreeManagementPage;
