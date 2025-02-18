import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import WordCloud from 'react-d3-cloud';
import axios from 'axios';
import { useSelector } from 'react-redux';

const KeywordChart = () => {
  const [data, setData] = useState([]);
  const caseId = useSelector((state) => state.caseData.caseData.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://5.180.148.40:9005/api/das/aggregate', {
          query: { unified_case_id: caseId },
          aggs_fields: ["unified_record_type", "unified_date_only", "unified_type", "socialmedia_hashtags"]
        });

        console.log("summary::::", response);

        const { socialmedia_hashtags } = response.data;
        if (socialmedia_hashtags) {
          setData(socialmedia_hashtags);
        } else {
          setData([]); // Set data to an empty array if socialmedia_hashtags is undefined
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]); // Set data to an empty array on error
      }
    };

    fetchData();
  }, [caseId]);

  const dataa = data && data.map((item) => ({
    text: item.key, // ✅ WordCloud me "key" dikhega
    value: item.doc_count, // ✅ "doc_count" ke mutaabiq size badhega
  }));

  const fontSizeMapper = (word) => Math.log2(word.value + 1) * 50; // ✅ Size adjust kiya
  const rotate = () => 0; // ✅ Fixed rotation (seedha text dikhane ke liye)

  return (
    <Box width={600} height={230} style={{ marginTop: 0,padding: 0 }}>
      <WordCloud
        data={dataa}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
       margin={0}
    
        width={600}
        height={250}
      />
    </Box>
  );
}

export default KeywordChart;
