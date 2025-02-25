import React from 'react'

//import Pagination from './pagination'
import CaseHeader from './caseHeader'
import CaseData from './TabularData/tabulerData'
import { useState } from 'react'
import TabulerData from './TabularData/tabulerData'
import GraphicalData from './GraphicalData/graphicalData'

const CaseTableDataFilter = () => {
  // const [filter, setFilter] = useState([]);
  const [view, setView] = useState('caseData'); // Default view is 'caseData'

  const handleButtonClick = (viewType) => {
    setView(viewType); // Update the view when a button is clicked
  };
  

  return (

    <>
    <CaseHeader onIconClick={handleButtonClick}/>
      {/* <CaseData data={data}  onIc/> */}
      {view === 'caseData' ? <TabulerData /> : <GraphicalData />}
    </>
  )
}

export default CaseTableDataFilter
