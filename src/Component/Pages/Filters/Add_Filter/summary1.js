import React,{useState} from "react";
import PreHeader from "./Summary/preheader.js";
//import CardRow from "./Summary/cardRow.js";
import { Plus} from 'react-bootstrap-icons';
import "../../../../Assets/Stlyes/summary.css"
import ProgressRow from "./Summary/progressBar.js";
import { Container, Box, Typography,TableFooter, Button, Table, TableContainer,TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import Component1 from "./Summary/cardlList.js";
import { useSelector } from 'react-redux';
import AddFilter2 from '../AddExistingFilter/addFilter2.js';
const Summary = () => {

    const data1 = useSelector((state) => state.caseData.caseData)

 const taskId = useSelector((state) => state.taskFilterId.taskId);
 const filterId = useSelector((state) => state.taskFilterId.filterId);
 const data = useSelector((state) => state.filterData.data);
 const count = useSelector((state) => state.summaryData.count);
 const socialmedia = useSelector((state) => state.summaryData.social_media);
 const datese = useSelector((state) => state.summaryData.dates);
 const filterCount = useSelector((state) => state.filterCount.filterCount.count);
 console.log("piedata", filterCount)
 console.log("summaryadata", count)
 console.log("summaryadata", socialmedia)
 console.log("summaryadata", datese)
 const headers =useSelector((state) => state.filterData.headers);
 console.log("headers", headers)

  const [showPopup, setShowPopup] = useState(false);

  const pieData = Object.entries(socialmedia).map(([platform, value]) => ({
    name: platform,
    value
  }));
  const totalCount = Object.values(socialmedia).reduce((sum, count) => sum + count, 0);

//  const barvalues = Object.keys(data[0].data); 
//  console.log("barvalues", barvalues)
// const barData = barvalues.map((header) => ({
//   name: header,
//   value: data.reduce((sum, entry) => sum + (entry[header] || 0), 0), // Sum of all entries
// }));
const barData = Object.keys(datese).map((date) => ({
  name: date,
  value: datese[date]
}));
console.log("bardataaaa",barData )

  const COLORS = [
    "#333", 
  ];

  const maxValue = Math.max(...barData.map(data => data.value));
  const ticks = Array.from({ length: 8 }, (_, i) => Math.round((maxValue / 7) * i));
  const legendPayload = Object.entries(socialmedia).map(([platform, count]) => ({
    value: `${platform}: ${count}`,
    type: 'square',
    id: platform,
  }));

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  }; 

  return (
    <>


    <Container>
    <Box width="100%">
    <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1} mt={2}>
    <button  className="add-new-filter-button" onClick={togglePopup}>Add Resources</button>
  </Box>
  <ProgressRow  label="Overall Progress" />
      <h5 style={{textAlign:"center"}}> FilterCount:{filterCount}</h5>
</Box>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop:'5rem' }}>
        
        <Box width={400} height={300} className="box"  >
          <PieChart width={300} height={300}>
          <Legend payload={legendPayload} verticalAlign="top" height={25} />
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#333"
              // paddingAngle={50}
               dataKey="value"
               labelLine={true}
              //  label={({ name, percent, value }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
            >
              {/* {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))} */}
               <Cell  />
            </Pie>
            <Tooltip />
          
          </PieChart>
        </Box>

        <Box width={400} height={300}  className="box"  >
          <BarChart width={400} height={300} data={barData} style={{pointerEvents: 'none' }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
            <YAxis 
             domain={[0, maxValue]} 
             ticks={ticks} 
             tick={{ fill: 'black'}} 
             orientation="right"
            />
            <Bar dataKey="value" fill="#333" barSize={25} />
            <Tooltip />
            <Legend />
          </BarChart>
        </Box>

        <Box width={400} height={300} className="box"  >
          <TableContainer component={Paper} height={300} >
            <Table height={300}>
              <TableHead>
                <TableRow>
                  <TableCell>Platform</TableCell>
                  <TableCell align="right">No. of Records</TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(socialmedia).map(([platform, count]) => (
                  <TableRow key={platform}>
                    <TableCell  scope="row" style={{padding: "0px 5px"}}>
                      {platform}
                    </TableCell>
                    <TableCell  style={{padding: "0px 5px"}} align="right">{count}</TableCell>
                   
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell align="right" >{totalCount}</TableCell>
            
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </Container>
    {showPopup && <AddFilter2 togglePopup={togglePopup} />}
    </>
      
  );
};

export default Summary;
