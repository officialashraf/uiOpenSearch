import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Box, Typography, Table, TableContainer,TableFooter, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,Cell, Tooltip as BarTooltip } from 'recharts';

const Summary = () => {
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const caseId = useSelector((state) => state.caseData.caseData.case_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://5.180.148.40:9005/api/das/aggregate', {
          query: {
            case_id: caseId
          }
        });

        const { social_media, rss, dates } = response.data;

        // Determine the data for the pie chart
        let pieSource = [];
        if (social_media) pieSource.push({ name: 'social_media', value: social_media.length });
        if (rss) pieSource.push({ name: 'rss', value: rss.length });

        // Determine the data for the bar chart
        const barData = dates.map(item => ({
          name: item.key,
          value: item.doc_count
        }));

        // Determine the data for the table
        const tableData = (social_media || []).concat(rss || []);
        const totalCount = tableData.reduce((sum, item) => sum + item.doc_count, 0);

        setPieData(pieSource);
        setBarData(barData);
        setTableData(tableData);
        setTotalCount(totalCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [caseId]);

  return (
    <Container>
      <Box width="100%">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} mt={2}>
          <Typography variant="h5">Summary</Typography>
        </Box>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5rem' }}>
          <Box width={400} height={300} className="box">
            <ResponsiveContainer width={400} height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#333"
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#333" />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Box width={400} height={300} className="box">
            <ResponsiveContainer width={400} height={300}>
              <BarChart data={barData} style={{pointerEvents: 'none' }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#333" />
                <BarTooltip />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          <Box width={400} height={300} className="box">
            <TableContainer component={Paper} height={300}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Platform</TableCell>
                    <TableCell align="right">No. of Records</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map(item => (
                    <TableRow key={item.key}>
                      <TableCell>{item.key}</TableCell>
                      <TableCell align="right">{item.doc_count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell align="right">{totalCount}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </div>
      </Box>
    </Container>
  );
};

export default Summary;