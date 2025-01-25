import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom'
import Summary from './summary.js';
import Jobs from './jobs';
import Reports from './reports';
import Tasks from './tasks';
import Contributors from './contributors';
import History from './history';
import  '../../../../Assets/Stlyes/mainContainer.css';
//import CaseTableDataFilter from '../AddExistingFilter/TabularData/caseTableDataFilter';

const MainContainer = () => {
  const navigate = useNavigate();
  const selectedTab = useSelector((state) => state.selectedTab.selectedTab);
  const caseData1 = useSelector((state) => state.caseData.caseData);
  console.log("caseData1",caseData1);
  const caseData2 = useSelector((state) => state.caseData.caseData);
  console.log("casedata2", caseData2)
  const addResource = ()=>{
    navigate('/add-filter' )
  }
console.log("stlected", selectedTab)
  const renderContent = () => {
   
    switch (selectedTab) {
      
      case 'summary':
        return <Summary />;
      case 'jobs':
        return <Jobs />;
      case 'reports':
        return <Reports />;
      case 'tasks':
        return <Tasks />;
      case 'contributors':
        return <Contributors />;
      case 'history':
        return <History />;
      // case 'analyze':
      //   return <CaseTableDataFilter/>;
        // return (
        //   <div>
        //     <h3>Analyze</h3>
        //     <p>Analyze Content</p>
        //   </div>
        // );
      default:
        
        return (
          <div className="containerM" >
            <h3 className="title">Let's Get Started!</h3>
          
            <p className="content">Add resources to get started</p>
            <Button variant="primary" className="create-case-button" onClick={addResource } >
              <FaPlus /> Add Resources
            </Button>
          </div>
          
        );
       
    }
  };

  return <div className="containerM" containerM style={{background:"lightgray", margin:'0px'}}>{renderContent()}</div>;
};

export default MainContainer;
