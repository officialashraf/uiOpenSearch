import React, { useState } from 'react'
//import { Folder, FileEarmarkPlus, PieChart, Check2Circle, PauseCircle, Archive, Trash } from 'react-bootstrap-icons';
import Header from './header.js'
import Sidebar from './leftSideBar.js'
import CardList from './cards.js'
import '../../../Assets/Stlyes/dashboard.css'
import RightSidebar from './rightSideBar.js'
import DataTable from '../Case/caseList.js'
import MainFilter from '../Filters/Add_Filter/mainFilterPage.js';
import AnalyzeTable from '../Filters/AddExistingFilter/TabularData/caseTableDataFilter.js';
import HeaderFilter from '../Filters/Add_Filter/headerFilter.js'
import MainContainer from '../Filters/Add_Filter/mainContainer.js'


const Home = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [showCaseTableDataFilter, setShowCaseTableDataFilter] = useState(false); // Function to handle table field click 
  const [showAnalyzeTable, setShowAnalyzeTable] = useState(false);
  const handleAnalyzeClick = () => { setShowAnalyzeTable(true); };
  const handleTableFieldClick = (caseData1) => {
    setSelectedCase(caseData1);
    setShowCaseTableDataFilter(true);
  };
  const data = [
    { name: 'All Files', number: 25 },
    { name: 'New Files', number: 5},
    { name: 'In Progress', number: 5, },
    { name: 'Closed', number: 8 },
    { name: 'On Hold', number: 3 },
    { name: 'Archived', number: 12 },
    { name: 'Deleted', number: 7 },
  ];

  return (
    <div >
      {/* <Header />

      <div className="dashboard-container">

        <div className="cont-a">
          <Sidebar />
        </div> */}


        {/* <div className="cont-b"> */}
        <div className="row-1"> 
           <CardList data={data} /> </div>
            <div className="row-2">
             <DataTable onFieldClick={handleTableFieldClick}  />
           {/* </div>  */}
          {/* {showAnalyzeTable ? (<AnalyzeTable />) :
           showCaseTableDataFilter ? 
           (<MainFilter onAnalyzeClick={handleAnalyzeClick} caseData1={selectedCase} />) : 
           (<> <div className="row-1"> 
           <CardList data={data} /> </div>
            <div className="row-2">
             <DataTable onFieldClick={handleTableFieldClick}  />
           </div> </>)} */}
           {/* <MainFilter caseData1={selectedCase} /> */}
        </div>


        {/* <div className="cont-c">
          <RightSidebar  />
        </div>
      </div> */}
    </div>
  )
}

export default Home
