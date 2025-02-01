import React from "react";
import PreHeader from "./Summary/preheader.js";
//import CardRow from "./Summary/cardRow.js";
import ProgressRow from "./Summary/progressBar.js";
import { Container, Box, Typography, Grid  } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import Component1 from "./Summary/cardlList.js";
import { useSelector } from 'react-redux';

const Summary = () => {

 const taskId = useSelector((state) => state.taskFilterId.taskId);
 const filterId = useSelector((state) => state.taskFilterId.filterId);
 const data = useSelector((state) => state.filterData.data);
 console.log("summaryadata", data)
 const headers =useSelector((state) => state.filterData.headers);
  console.log("headers", headers)

  //const pieData = {
  //   labels: ["Instagram", "LinkdIn", "Snapchat"],
  //   datasets: [
  //     {
  //       data: [500, 1000, 1800],
  //       backgroundColor: ["balck", "white", "gray"],
  //     },
  //   ],
  // };

  // const barData = {
  //   labels: ["Instagram", "LinkdIn", "Snapchat"],
  //   datasets: [
  //     {
  //       label: "Monthly Data",
  //       data: [500, 1000, 1800],
  //       backgroundColor: ["black", "white", "gray"],
  //     },
  //   ],
  // };

  const pieData = headers.map((header) => ({
    name: header,
    value: Math.floor(Math.random() * 50) + 1,//data.reduce((acc, item) => acc + (item.data[header] || 0), 0)
  }));
 console.log("piedata", pieData)
 const barvalues = Object.keys(data[0].data); 
 console.log("barvalues", barvalues)
const barData = barvalues.map((header) => ({
  name: header,
  value: data.reduce((sum, entry) => sum + (entry[header] || 0), 0), // Sum of all entries
}));
console.log("bardataaaa",barData )

  const COLORS = [
    "#333", 
  ];


  return (
    <div className="container">
      <PreHeader
        count={50}
        size={"Medium"}
        totalUploads={0}
        totalApproved={0}
        totalUnderProcessing={0}
        totalUnsupported={0}
        totalDiscard={0}
      />
    
      <Component1 />
      <ProgressRow now={50} label="Overall Progress" />
    
      <Container>
    <Box mt={4}>
      <Typography variant="h5">Summary</Typography>
     
       
           <PieChart width={400} height={400}>
    <Pie
      data={pieData}
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={80}
      fill="#333"
      paddingAngle={50}
       dataKey="value"
       labelLine={true}
      label={({ name, percent, value }) => `${name}: ${value}${(percent * 100).toFixed(0)}%`}
    >
      {pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
    
          <BarChart width={600} height={500} data={barData}>
            {/* <CartesianGrid  />
            <XAxis dataKey="name"  tick={{ fontSize: 12 }}  />
            <YAxis  domain={[0,50]} tick={{ fontSize: 12 }}  />
            <Tooltip />
            <Legend />
            {headers.map((header,index) => (
              <Bar key={header} dataKey={header}  fill={COLORS[index % COLORS.length]} barSize={5} />
            ))}
            <Bar/> */}
         
         
          <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
  <YAxis domain={[0,50]} />
  <Tooltip />
  <Legend />
  <Bar dataKey="value" fill="#8884d8" barSize={5} />
  </BarChart>
    </Box>
  
  </Container>

    </div>
  );
};

export default Summary;
