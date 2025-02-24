
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Slider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ReferenceLine } from 'recharts';
import '../../../../../Assets/Stlyes/lineChart.css'

const LineChart1 = () => {
  const [data, setData] = useState([]);
  const [recordTypes, setRecordTypes] = useState([]);
  const caseId = useSelector((state) => state.caseData.caseData.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://5.180.148.40:9005/api/das/aggregate', {
          query: { unified_case_id: caseId },
          aggs_fields: ["unified_date_only", "unified_record_type"]
        });

        console.log("line", response);

        const { unified_date_only, unified_record_type } = response.data;

        if (unified_date_only) {
          setData(unified_date_only);
        } else {
          setData([]);
        }

        if (unified_record_type) {
          setRecordTypes(unified_record_type);
         

        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
        setRecordTypes([]);
      }
    };

    fetchData();
  }, [caseId]);

  return (
    <Box className="mt-1 h-[200px]">
      {data.length > 0 ? (
        <LineChart 
          width={1200} 
          height={150} 
          data={data}
          margin={{  right: 50}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="key" 
            tick={{ fontSize: 12 }} 
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
          />
          <Tooltip 
            content={({ payload }) => 
              payload?.length ? (
                <div className="bg-white p-2 border rounded shadow">
                  <p>{payload[0].payload.key}</p>
                  <p>doc_count: {payload[0].value}</p>
                </div>
              ) : null
            } 
          />
          <Legend />

          {/* Horizontal Reference Lines for each record type */}
        {recordTypes.length > 0 ? recordTypes.map((type, index) => (
  <ReferenceLine
    key={index}
    y={type.doc_count}
    stroke="black"
    strokeWidth={2}
    // strokeDasharray="5 5"
    label={{
      value: `${type.key} (${type.doc_count})`,
      position: 'right',
      fill: 'black',
      fontSize: 12,
      fontWeight: 'bold'
    }}
  />
)) : console.log("No Record Types Found")}

          {/* Curved Line for date-wise doc_count */}
          <Line
            type="monotone"
            dataKey="doc_count"
            stroke="black"
            fill="black"
            strokeWidth={2}
            dot={{ r: 3 }} // Small dots on points
          />
        </LineChart>
      ) : (
        <div className="h-[150px] flex items-center justify-center">
          <p className="text-gray-500 text-xl">No Data Available</p>
        </div>
      )}

      <div className="w-full mt-2">
        <Slider
          defaultValue={[50]}
          min={0}
          max={100}
          step={1}
          className="w-full"
          stroke="gray"
          style={{
       
          }}
        />
      </div>
    </Box>
  );
};

export default LineChart1;

