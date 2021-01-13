import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Legend, Tooltip, PieChart, Pie, Cell } from "recharts";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { gql, useQuery } from "@apollo/client";

import Layout from "../../layout";
import { AppContext } from "../../context";
import { useHistory } from "react-router-dom";

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
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
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
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DashboardPage = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  const classes = useStyles();
  const [overridPie, setOverridePie] = useState([]);
  const { data: returnedDecisionData } = useQuery(GET_DECISION_DATA, {
    pollInterval: 10000,
  });
  const [decisionData, setDecisionData] = useState([]);
  const { data: returnedPatientData } = useQuery(GET_PATIENT_DATA, {
    pollInterval: 10000,
  });
  const [reportsData, setReportsData] = useState([]);

  if (context.user?.role == null || context.user?.role !== "ADMIN") {
    history.push("/decisionsupportpage");
  }

  useEffect(() => {
    setOverridePie(overridePieProcessedData());
    processDecisionTableData();
    processSymptomsTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnedDecisionData]);

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
      returnedDecisionData.finalDecisions.forEach((finalDecision, index) => {
        temp_data.push({ id: index + 1, ...finalDecision });
      });
      setDecisionData(temp_data);
      console.log("temp_data :>> ", temp_data);
    }
  };

  const processSymptomsTableData = () => {
    if (returnedPatientData) {
      let temp_data = [];
      returnedPatientData.getReport.forEach((report, index) => {
        temp_data.push({ id: index + 1, ...report });
      });
      setReportsData(temp_data);
      console.log("temp_data :>> ", temp_data);
    }
  };

  const reportsTableColumns = [
    { field: "id", headerName: "No", width: 80 },
    { field: "mRNNumber", headerName: "MRN Number", width: 200 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "report", headerName: "Symptoms", width: 500 },
  ];

  const decisionTableColumns = [
    { field: "id", headerName: "No", width: 80 },
    { field: "staffId", headerName: "Staff ID", width: 150 },
    { field: "mRNNumber", headerName: "MRN Number", width: 200 },
    { field: "decision", headerName: "decision", width: 120 },
    { field: "isOverride", headerName: "Overridden", width: 120 },
    {
      field: "overridingDecision",
      headerName: "Overriding Decision",
      width: 200,
    },
    { field: "reason", headerName: "Overriding Reason", width: 300 },
  ];

  return (
    <Layout title="Dashboard Page">
      <div className={classes.container}>
        <div style={{ margin: 50, alignSelf: "center" }}>
          <Typography variant="h4">
            Overview of Agreed and Overridden decision
          </Typography>
          <PieChart width={800} height={400}>
            <Pie
              data={overridPie}
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
        </div>

        <Typography variant="h4" style={{ margin: "0px 50px" }}>
          Details of Agreed and Overridden decision
        </Typography>
        <div style={{ minHeight: 400, width: "90%", margin: 50 }}>
          <DataGrid
            rows={decisionData}
            columns={decisionTableColumns}
            pageSize={5}
            disableSelectionOnClick
          />
        </div>

        <Typography variant="h4" style={{ margin: "0px 50px" }}>
          Details of patients reported symptoms
        </Typography>
        <div style={{ minHeight: 400, width: "90%", margin: 50 }}>
          <DataGrid
            rows={reportsData}
            columns={reportsTableColumns}
            pageSize={5}
            disableSelectionOnClick
          />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
