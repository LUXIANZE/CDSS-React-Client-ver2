import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Typography from "@material-ui/core/Typography";
import { gql, useQuery } from "@apollo/client";

import Layout from "../../layout";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const GET_DECISION_DATA = gql`
  query {
    finalDecisions {
      staffId
      isOverride
      reason
      mRNNumber
      decision
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

const data1 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
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

const data = [
  { name: "Sunday", uv: 400, pv: 2400, amt: 2400 },
  { name: "Monday", uv: 300, pv: 2400, amt: 2400 },
  { name: "Tuesday", uv: 200, pv: 2400, amt: 2400 },
  { name: "Wednesday", uv: 450, pv: 2400, amt: 2400 },
  { name: "Thursday", uv: 120, pv: 2400, amt: 2400 },
  { name: "Friday", uv: 430, pv: 2400, amt: 2400 },
  { name: "Saturday", uv: 400, pv: 2400, amt: 2400 },
];

const data3 = [
  { name: "Sunday", Accepted: 4000, Rejected: 2400, amt: 2400 },
  { name: "Monday", Accepted: 3000, Rejected: 1398, amt: 2210 },
  { name: "Tuesday", Accepted: 2000, Rejected: 9800, amt: 2290 },
  { name: "Wednesday", Accepted: 2780, Rejected: 3908, amt: 2000 },
  { name: "Thursday", Accepted: 1890, Rejected: 4800, amt: 2181 },
  { name: "Friday", Accepted: 2390, Rejected: 3800, amt: 2500 },
  { name: "Saturday", Accepted: 3490, Rejected: 4300, amt: 2100 },
];

const DashboardPage = () => {
  const classes = useStyles();
  const [overridPie, setOverridePie] = useState([]);
  const {
    loading,
    error,
    data: returnedDecisionData,
  } = useQuery(GET_DECISION_DATA, { pollInterval: 500 });

  useEffect(() => {
    setOverridePie(overridePieProcessedData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnedDecisionData]);

  const overridePieProcessedData = () => {
    let data = {
      Overridden: 0,
      Agreed: 0,
    };
    returnedDecisionData.finalDecisions.forEach((element) => {
      element.isOverride ? (data.Overridden += 1) : (data.Agreed += 1);
    });
    return [
      { name: "Overridden", value: data.Overridden },
      { name: "Agreed", value: data.Agreed },
    ];
  };

  return (
    <Layout title="Dashboard Page">
      <div className={classes.container}>
        {/* <div style={{ margin: 50, alignSelf: "center" }}>
          <Typography variant="h4">Weekly reports count</Typography>
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div> */}
        <div style={{ margin: 50, alignSelf: "center" }}>
          <Typography variant="h4">Agreed and Overridden decision</Typography>
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

        <div
          style={{
            margin: 50,
            alignSelf: "center",
          }}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Staff ID</TableCell>
                  <TableCell align="center">MRN Number</TableCell>
                  <TableCell align="center">Decision Generated</TableCell>
                  <TableCell align="center">Overriding Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {returnedDecisionData.hasOwnProperty("finalDecisions") &&
                  returnedDecisionData.finalDecisions.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="center">{row.staffId}</TableCell>
                      <TableCell align="center">{row.mRNNumber}</TableCell>
                      <TableCell align="center">{row.decision}</TableCell>
                      <TableCell align="center">{row.reason}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div style={{ margin: 50, alignSelf: "center" }}>
          <Typography variant="h4">Decision accepted and rejected</Typography>
          <BarChart
            width={800}
            height={500}
            data={data3}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Rejected" fill="#8884d8" />
            <Bar dataKey="Accepted" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
