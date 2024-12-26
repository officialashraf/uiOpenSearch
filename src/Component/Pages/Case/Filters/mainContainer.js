import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Summary from './summary';
import Jobs from './jobs';
import Reports from './reports';
import Tasks from './tasks';
import Contributors from './contributors';
import History from './history';
import  '../../../../Assets/Stlyes/mainContainer.css';

const MainContainer = () => {
  const selectedTab = useSelector((state) => state.slectedTab.selectedTab);
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
      case 'analyze':
        return (
          <div>
            <h3>Analyze</h3>
            <p>Analyze Content</p>
          </div>
        );
      default:
        
        return (
          <div className="containerM" text-center mt-4>
            <h3 className="title">Let's Get Started!</h3>
            <p className="content">Add resources to get started</p>
            <Button variant="primary" className="button">
              <FaPlus /> Add Resources
            </Button>
          </div>
          
        );
       
    }
  };

  return <div>{renderContent()}</div>;
};

export default MainContainer;
