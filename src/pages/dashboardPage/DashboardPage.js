import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";

import Layout from "../../layout";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
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

const DashboardPage = () => {
  const classes = useStyles();

  return (
    <Layout title="Dashboard Page">
      <div className={classes.container}>
        <div style={{ margin: 50 }}>
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
        </div>
        <div style={{ margin: 50 }}>
          <PieChart width={800} height={400}>
            <Pie
              data={data1}
              cx={300}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
            >
              {data1.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
