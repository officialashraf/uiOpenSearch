import React,{useState} from 'react';
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
import AddFilter2 from '../AddExistingFilter/addFilter2.js';
//import CaseTableDataFilter from '../AddExistingFilter/TabularData/caseTableDataFilter';

const MainContainer = () => {
  const navigate = useNavigate();
  const selectedTab = useSelector((state) => state.selectedTab.selectedTab);
  const caseData1 = useSelector((state) => state.caseData.caseData);
  console.log("caseData1",caseData1);
  const caseData2 = useSelector((state) => state.caseData.caseData);
  console.log("casedata2", caseData2)
  const [showPopup, setShowPopup] = useState(false);
 

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };   

console.log("stlected", selectedTab)
  const renderContent = () => {
   
    switch (selectedTab) {
      
      case 'summary':
        return <Summary />
      case 'jobs':
        return <Jobs />
      case 'reports':
        return <Reports />
      case 'tasks':
        return <Tasks />
      case 'contributors':
        return <Contributors />
      case 'history':
        return <History />
     
      default:
        
        return (
          <div className="resourcesContainer" >
            <h3 className="title">Let's Get Started!</h3>
          
            <p className="content">Add resources to get started</p>
            <Button variant="primary" className="add-resource-button" onClick={togglePopup} >
              <FaPlus /> Add Resources
            </Button>
          </div>
          
        );
       
    }
  };

  return <> <div className="containerM" containerM style={{background:"lightgray", margin:'0px'}}>{renderContent()}</div>
  {showPopup && <AddFilter2 togglePopup={togglePopup} />}
  </>
};

export default MainContainer;
