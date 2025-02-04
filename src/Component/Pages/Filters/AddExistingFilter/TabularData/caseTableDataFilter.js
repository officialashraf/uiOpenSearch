import React from 'react'

//import Pagination from './pagination'
import CaseHeader from './caseHeader'
import CaseData from './tabulerData'
import { useState } from 'react'
import TabulerData from './tabulerData'
import GraphicalData from './graphicalData'

const CaseTableDataFilter = () => {
  // const [filter, setFilter] = useState([]);
  const [view, setView] = useState('caseData'); // Default view is 'caseData'

  const handleButtonClick = (viewType) => {
    setView(viewType); // Update the view when a button is clicked
  };
  const data = Array.from({ length: 112 }, (_, i) => ({
    id: i + 1,
    fileName: `File_name_${i + 1}`,
    individual: `Individual ${i + 1}`,
    organization: i % 2 === 0 ? "Lumen" : "Nikotech",
    location: i % 3 === 0 ? "Mumbai, India" : "Hyderabad, India",
    email: `user${i}@example.com`,
    phone: i % 2 === 0 ? `123-456-789${i}` : "-",
    tags: [`tag ${i}`, `tag ${i + 1}`, `tag ${i + 2}`].join(", "),
    imei: i % 2 === 0 ? `35904337488${i}` : "-",
  }));

  // const handleFilterChange = (location) => {
  //   setFilter((prev) =>
  //     prev.includes(location)
  //       ? prev.filter((loc) => loc !== location)
  //       : [...prev, location]
  //   );
  // };

  // const filteredData = 
  // filter.length
  //   ? data.filter((item) => filter.includes(item.location))
  //   : data;

  return (

    <>
    <CaseHeader onIconClick={handleButtonClick}/>
      {/* <CaseData data={data}  onIc/> */}
      {view === 'caseData' ? <TabulerData /> : <GraphicalData />}
    </>
  )
}

export default CaseTableDataFilter
