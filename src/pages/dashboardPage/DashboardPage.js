import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Legend, Tooltip, PieChart, Pie, Cell } from "recharts";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";

import Layout from "../../layout";

const GET_DECISION_DATA = gql`
  query {
    finalDecisions {
      staffId
      isOverride
      reason
      overridingDecision
      mRNNumber
      decision
    }
  }
`;

const GET_PATIENT_DATA = gql`
  query {
    getReport {
      mRNNumber
      report
      date
    }
  }
`;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "scroll",
  },
});

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, value } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}% (${value})`}
    </text>
  );
};

const DashboardPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const [overridPie, setOverridePie] = useState([]);
  const { data: returnedDecisionData } = useQuery(GET_DECISION_DATA, {
    pollInterval: 500,
  });
  const [decisionData, setDecisionData] = useState([]);
  const { data: returnedPatientData } = useQuery(GET_PATIENT_DATA, {
    pollInterval: 500,
  });
  const [reportsData, setReportsData] = useState([]);

  if (localStorage.getItem("user")) {
    const raw_user = localStorage.getItem("user");
    const valid_user = JSON.parse(raw_user);
    if (valid_user?.role == null || valid_user?.role !== "ADMIN") {
      history.push("/decisionsupportpage");
    }
  }

  useEffect(() => {
    setOverridePie(overridePieProcessedData());
    processDecisionTableData();
    processSymptomsTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnedDecisionData, returnedPatientData]);

  const overridePieProcessedData = () => {
    let data = {
      Overridden: 0,
      Agreed: 0,
    };
    if (
      returnedDecisionData &&
      returnedDecisionData.hasOwnProperty("finalDecisions")
    ) {
      returnedDecisionData.finalDecisions.forEach((element) => {
        element.isOverride ? (data.Overridden += 1) : (data.Agreed += 1);
      });
    }

    return [
      { name: "Overridden", value: data.Overridden },
      { name: "Agreed", value: data.Agreed },
    ];
  };

  const processDecisionTableData = () => {
    if (returnedDecisionData) {
      let temp_data = [];
      let reversedList = [...returnedDecisionData.finalDecisions];
      reversedList = reversedList.reverse();
      reversedList.forEach((finalDecision, index) => {
        temp_data.push({ id: index + 1, ...finalDecision });
      });
      setDecisionData(temp_data);
    }
  };

  const processSymptomsTableData = () => {
    if (returnedPatientData) {
      let temp_data = [];
      let reversedList = [...returnedPatientData.getReport];
      reversedList = reversedList.reverse();
      reversedList.forEach((report, index) => {
        temp_data.push({ id: index + 1, ...report });
      });
      setReportsData(temp_data);
    }
  };

  const reportsTableColumns = [
    { field: "id", headerName: "No", width: 80 },
    { field: "mRNNumber", headerName: "MRN Number", width: 200 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "report", headerName: "Symptoms", width: 1000 },
  ];

  const decisionTableColumns = [
    { field: "id", headerName: "No", width: 80 },
    { field: "staffId", headerName: "Staff ID", width: 150 },
    { field: "mRNNumber", headerName: "MRN Number", width: 200 },
    { field: "decision", headerName: "decision", width: 120 },
    { field: "isOverride", headerName: "Overridden", width: 150 },
    {
      field: "overridingDecision",
      headerName: "Overriding Decision",
      width: 180,
    },
    { field: "reason", headerName: "Overriding Reason", width: 1000 },
  ];

  return (
    <Layout title="Dashboard Page">
      <div className={classes.container}>
        <div style={{ margin: 50 }}>
          <Typography variant="h4">
            Overview of Agreed and Overridden decision
          </Typography>
          <div style={{ display: "flex" }}>
            <PieChart width={650} height={400}>
              <Pie
                data={overridPie}
                dataKey="value"
                cx={300}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
              >
                {overridPie.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            {/* <Card raised style={{ borderRadius: 30, padding: 30 }}>
              Hello
            </Card> */}
          </div>
        </div>

        <Typography variant="h4" style={{ margin: "0px 50px" }}>
          Details of Agreed and Overridden decision
        </Typography>
        <div style={{ minHeight: 400, width: "90%", margin: 50 }}>
          {returnedDecisionData && (
            <DataGrid
              rows={decisionData}
              columns={decisionTableColumns}
              pageSize={5}
              disableSelectionOnClick
            />
          )}
        </div>

        <Typography variant="h4" style={{ margin: "0px 50px" }}>
          Details of patients reported symptoms
        </Typography>
        <div style={{ minHeight: 400, width: "90%", margin: 50 }}>
          {returnedPatientData && (
            <DataGrid
              rows={reportsData}
              columns={reportsTableColumns}
              pageSize={5}
              disableSelectionOnClick
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
