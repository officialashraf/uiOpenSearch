import React, { useState } from 'react'
import { Folder, FileEarmarkPlus, PieChart, Check2Circle, PauseCircle, Archive, Trash } from 'react-bootstrap-icons';
import Header from './header.js'
import Sidebar from './leftSideBar.js'
import CardList from './cards.js'
import '../../../Assets/Stlyes/dashboard.css'
import RightSidebar from './rightSideBar.js'
import DataTable from '../Case/caseList.js'
import MainFilter from '../Filters/Add_Filter/mainFilterPage.js';
import AnalyzeTable from '../Filters/AddExistingFilter/TabularData/caseTableDataFilter.js';


const Home = () => {
  const [showCaseTableDataFilter, setShowCaseTableDataFilter] = useState(false); // Function to handle table field click 
  const [showAnalyzeTable, setShowAnalyzeTable] = useState(false);
  const handleAnalyzeClick = () => { setShowAnalyzeTable(true); }; 
 const handleTableFieldClick = () => { setShowCaseTableDataFilter(true); };
  const data = [
    { name: 'All Files', number: 25, icon: <Folder className="logo-icon" /> },
    { name: 'New Files', number: 10, icon: <FileEarmarkPlus className="logo-icon" /> },
    { name: 'In Progress', number: 5, icon: <PieChart className="logo-icon" /> },
    { name: 'Closed', number: 8, icon: <Check2Circle className="logo-icon" /> },
    { name: 'On Hold', number: 3, icon: <PauseCircle className="logo-icon" /> },
    { name: 'Archived', number: 12, icon: <Archive className="logo-icon" /> },
    { name: 'Deleted', number: 7, icon: <Trash className="logo-icon" /> },
  ];

  return (
    <div >
      <Header />

      <div className="dashboard-container">

        <div className="cont-a">
          <Sidebar />
        </div>


        <div className="cont-b">
          {showAnalyzeTable ? (<AnalyzeTable  />) : showCaseTableDataFilter ? (<MainFilter onAnalyzeClick={handleAnalyzeClick} />) : (<> <div className="row-1"> <CardList data={data} /> </div> <div className="row-2"> <DataTable onFieldClick={handleTableFieldClick} /> </div> </>)}
        </div>


        <div className="cont-c">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default Home
