

import React, { useState, useEffect } from 'react';
import { Box , Slider, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ReferenceLine } from 'recharts';
import { useSelector } from 'react-redux';
import axios from 'axios';


const LineChart1 = () => {
  const [data, setData] = useState([]);
  const caseId = useSelector((state) => state.caseData.caseData.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://5.180.148.40:9005/api/das/aggregate', {
          query: { unified_case_id: caseId },
          aggs_fields: ["unified_date_only", "unified_record_type"]
        });

        console.log("line", response);

        const { unified_date_only } = response.data;
        if (unified_date_only) {
          setData(unified_date_only);
        } else {
          setData([]); // Set data to an empty array if unified_date_only is undefined
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]); // Set data to an empty array on error
      }
    };

    fetchData();
  }, [caseId]);

  return (
    <Box height={250} sx={{ marginTop: 1 }}>
        {data.length > 0 ? (
      <LineChart width={1200} height={150} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip content={({ payload }) => payload.length ? `doc_count: ${payload[0].value}` : ''} />
        <Legend />
        {/* <ReferenceLine y={1539} stroke="darkgray" dataKey={1539} strokeWidth={2}  label="social_media" />
        <ReferenceLine y={29} stroke="darkgray" dataKey={29} strokeWidth={2}  label="rss" /> */}
        <Line type="monotone" dataKey="doc_count" stroke="darkgray" fill='black'  strokeWidth={2} />
      </LineChart>
        ) : (
          <Typography variant="h6" color="textSecondary" align="center" height={150}>
            No Data Available
          </Typography>
        )}
      <Slider
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        sx={{
          width: '100%',
          marginTop: 0,
          marginBottom: 0,
          padding: 0,
          color: 'darkgray',
        }}
      />
    </Box>
  );
}

export default LineChart1;
