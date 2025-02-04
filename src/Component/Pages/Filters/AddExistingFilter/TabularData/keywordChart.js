import React from 'react';
import { Box } from '@mui/material';
import WordCloud from 'react-d3-cloud';

const data = [
  { text: 'Keyword 1', value: 100 },
  { text: 'Keyword 2', value: 200 },
  { text: 'Keyword 3', value: 300 },
  { text: 'Keyword 4', value: 150 },
  { text: 'Keyword 5', value: 250 },
  { text: 'Keyword 6', value: 350 },
  { text: 'Keyword 7', value: 400 },
];

const fontSizeMapper = word => Math.log2(word.value) * 10;

const KeywordChart = () => {
  return (
    <Box width={400} height={230} style={{ marginTop: 0 }}>
      <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
        width={400}
        height={200}
      />
    </Box>
  );
}

export default KeywordChart;
