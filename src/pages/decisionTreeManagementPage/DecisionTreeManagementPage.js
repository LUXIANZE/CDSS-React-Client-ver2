import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

import Layout from "../../layout";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Card, CardContent, Typography } from "@material-ui/core";

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
  instructions: {
    borderRadius: 15,
    padding: 30,
  },
});

const DecisionTreeManagementPage = () => {
  const classes = useStyles();
  const [decisionTree, setDecisionTree] = useState({});
  const { data: decisionTreeFetched } = useQuery(GET_DECISION_TREES, {
    pollInterval: 1000 * 30,
  });
  const [updateDecisionTree] = useMutation(UPDATE_DECISION_TREE, {
    variables: {
      tree: JSON.stringify(decisionTree),
    },
    onCompleted: () => {
      alert("Successfully updated");
    },
  });

  useEffect(() => {
    if (
      decisionTreeFetched &&
      decisionTreeFetched.hasOwnProperty("getDecisionTree")
    ) {
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
          <div
            style={{
              alignSelf: "center",
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            <div style={{ flexGrow: 1, margin: 20 }}>
              <Card
                className={classes.instructions}
                raised
                style={{ height: "auto", maxWidth: 500 }}
              >
                <CardContent>
                  <Typography
                    component="h1"
                    variant="h3"
                    style={{ fontWeight: "bold" }}
                  >
                    Caution
                  </Typography>
                  <br />
                  <Typography>
                    • Please bear in mind that the decision tree is computer
                    generated, therefore the data is side are very sensitive to
                    changes
                  </Typography>
                  <br />
                  <Typography>
                    • Consult professional advice before changing the Decision
                    Tree's structure
                  </Typography>
                  <br />
                  <Typography>
                    • Contact +60143360623 in case of any major failure due to
                    changes in Decision Tree
                  </Typography>
                </CardContent>
              </Card>
              <div style={{ flexGrow: 1, margin: "20px 0px" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#25C8C8",
                    color: "#FFFFFF",
                    alignSelf: "center",
                    padding: "6px 16px",
                  }}
                  onClick={handleUpdateTreeClicked}
                >
                  Update Tree
                </Button>
              </div>
            </div>
            <div style={{ flexGrow: 8, margin: 20 }}>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DecisionTreeManagementPage;
