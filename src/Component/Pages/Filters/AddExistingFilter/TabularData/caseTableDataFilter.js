import React from 'react'

//import Pagination from './pagination'
import CaseHeader from './caseHeader'
import CaseData from './caseData'
//import { useState } from 'react'

const CaseTableDataFilter = () => {
  // const [filter, setFilter] = useState([]);
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
    <CaseHeader/>
      <CaseData data={data} />
      {/* <Pagination/> */}
    </>
  )
}

export default CaseTableDataFilter
