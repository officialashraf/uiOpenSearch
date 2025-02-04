import React from 'react';
import { Box , Slider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const LineChart1 = () => {
  return (
<>
<Box  height={250} sx={{ marginTop: 1 }}>
      <LineChart width={1200} height={150} data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" tick={{ fontSize: 10 }}/>
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip />
        <Legend />
        
        <Line type="monotone" dataKey="pv" stroke="darkgray" />
      </LineChart>
      <Slider
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        
        // onChange={handleSliderChange}
        sx={{
          width: '100%', // Make sure the slider takes full width
          marginTop: 0,
          width: '100%', // Full width
          marginBottom: 0, // Remove margin
          padding: 0, // Remove padding
          color: 'darkgray',
        }}
      />
    </Box>
    </>
  );
}

export default LineChart1;
