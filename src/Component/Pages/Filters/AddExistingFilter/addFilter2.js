import React, { useState} from 'react'
//import AddNewFilter from "./components/addNewFilter";
import ExistingFilters from "./existingFilter";

import AddNewFilter from './addNewFilter';
import "./main.css"
import { Plus, X} from 'react-bootstrap-icons'
import { useSelector } from 'react-redux';
//import MainContainer from '../Add_Filter/mainContainer';


const AddFilter2 = ({togglePopup}) => {
  const [showAddFilter, setShowAddFilter] = useState(false);
  const caseData1 = useSelector((state) => state.caseData.caseData);

  // Toggle visibility of Add New Filter form
  const toggleAddFilter = () => {
    setShowAddFilter(true);
  };

  // const togglePopup = () =>{
    
  // }

  return (
   <>
     <div className="popup-overlay" style={{ trigger:['hover, focus']}} >
      <div className="popup-container" style={{width:'50%'}}>
      <button className="close-icon" onClick={togglePopup}>
          &times;
        </button>
        <div className="popup-content">
     <div className="container-fluid p-4 main-body-div" >
        
      <div className="row main-body-div-1st-row">
      <div className="col-md-4 ">
      <button className='add-new-filter-button' onClick={toggleAddFilter}>
          <Plus />  Add New Filter 
          </button>
        <ExistingFilters />
        </div>
          {showAddFilter && (
        <div className="col-md-8" style={{marginTop:"-15px"}}>
         
            <button onClick={()=>(setShowAddFilter(false))} className="btn close-add-filter-button" >< X /> </button>       
            
            <AddNewFilter />
            
        </div>
          )}
         
      </div>
      {/* <button className="btn  btn-secondary" onClick={() => window.history.back()} >Back</button> */}
      {/* <button className="btn btn-sm btn-secondary mb-3 proceed-button" >Proceed</button> */}
    </div>
    </div>
    </div>
    </div>
   </>
  )
}

export default AddFilter2
