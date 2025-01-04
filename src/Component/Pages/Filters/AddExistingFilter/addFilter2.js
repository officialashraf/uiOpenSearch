import React, { useState} from 'react'
//import AddNewFilter from "./components/addNewFilter";
import ExistingFilters from "./existingFilter";
import AddNewFilter from './addNewFilter';
import "./main.css"
import { Plus, X} from 'react-bootstrap-icons'

const AddFilter2 = () => {
  const [showAddFilter, setShowAddFilter] = useState(false);


  // Toggle visibility of Add New Filter form
  const toggleAddFilter = () => {
    setShowAddFilter(true);
  };

  return (
   <>
  
     <div className="container-fluid p-4 main-body-div" >
          <button  className="btn btn-sm mb-3 add-new-filter-button" onClick={toggleAddFilter}>
          <Plus />  Add New Filter
          </button>
      <div className="row main-body-div-1st-row">
        
        <ExistingFilters/>

          {showAddFilter && (
        <div className="col-md-8" style={{marginTop:"-15px"}}>
         
            <button onClick={()=>(setShowAddFilter(false))} className="btn close-add-filter-button" >< X /> </button>       
            
            <AddNewFilter/>
            
        </div>
          )}
      </div>
      <button className="btn  btn-secondary" onClick={() => window.history.back()} >Back</button>
      <button className="btn btn-sm btn-secondary mb-3 proceed-button" >Proceed</button>
    </div>
   </>
  )
}

export default AddFilter2
