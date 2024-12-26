import React from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { setSelectedTab } from '../../../../Redux/Action/caseAction';
import  '../../../../Assets/Stlyes/preHeaderFilter.css';

const PreheaderFilter = () => {
  const dispatch = useDispatch();
  //const selectedTab = useSelector((state) => state.slectedTab);
  const selectedTab = useSelector((state) => state.slectedTab.selectedTab);
  const tabs = ['Summary', 'Jobs', 'Reports', 'Tasks', 'Contributors', 'History'];
  console.log("setsetlecteb", selectedTab)

  return (
    <Nav variant="tabs" className="navM">
      {tabs.map((tab) => (
        <Nav.Item key={tab} onClick={() => dispatch(setSelectedTab(tab.toLowerCase()))} 
        className={`navItemM  ${selectedTab === tab.toLowerCase() ? "active" : ""}`}
      >  
          <Nav.Link>{tab}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default PreheaderFilter;
