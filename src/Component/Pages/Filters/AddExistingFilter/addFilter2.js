import React, { useState,useEffect} from 'react'
//import AddNewFilter from "./components/addNewFilter";
import ExistingFilters from "./existingFilter";
import axios from 'axios';
import AddNewFilter from './addNewFilter';
import "./main.css"
import { Plus, X} from 'react-bootstrap-icons'
import { useSelector,useDispatch } from 'react-redux';
//import MainContainer from '../Add_Filter/mainContainer';


// const AddFilter2 = ({togglePopup}) => {
//   const [showAddFilter, setShowAddFilter] = useState(false);
//   const caseData1 = useSelector((state) => state.caseData.caseData);

//   // Toggle visibility of Add New Filter form
//   const toggleAddFilter = () => {
//     setShowAddFilter(true);
//   };

//   // const togglePopup = () =>{
    
//   // }

//   return (
//    <>
//      <div className="popup-overlay" style={{ trigger:['hover, focus']}} >
//       <div className="popup-container" style={{width:'50%'}}>
//       <button className="close-icon" onClick={togglePopup}>
//           &times;
//         </button>
//         <div className="popup-content">
//      <div className="container-fluid p-4 main-body-div" >
        
//       <div className="row main-body-div-1st-row">
//       <div className="col-md-4 ">
//       <button className='add-new-filter-button' onClick={toggleAddFilter}>
//           <Plus />  Add New Filter 
//           </button>
//         <ExistingFilters />
//         </div>
//           {showAddFilter && (
//         <div className="col-md-8" style={{marginTop:"-15px"}}>
         
//             <button onClick={()=>(setShowAddFilter(false))} className="btn close-add-filter-button" >< X /> </button>       
            
//             <AddNewFilter />
            
//         </div>
//           )}
         
//       </div>
//       {/* <button className="btn  btn-secondary" onClick={() => window.history.back()} >Back</button> */}
//       {/* <button className="btn btn-sm btn-secondary mb-3 proceed-button" >Proceed</button> */}
//     </div>
//     </div>
//     </div>
//     </div>
//    </>
//   )
// }

// export default AddFilter2
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
const AddFilter2 = ({ togglePopup }) => {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [initialSelectedFilters, setInitialSelectedFilters] = useState([]);
  const caseData1 = useSelector((state) => state.caseData.caseData);
  const token = Cookies.get('accessToken');


  const [showAddFilter, setShowAddFilter] = useState(false);
  

  // Toggle visibility of Add New Filter form
  const toggleAddFilter = () => {
    setShowAddFilter(true);
  };
  // Fetch initial filters associated with the case
  useEffect(() => {
    const fetchInitialFilters = async () => {
      try {
        const response = await axios.get('http://5.180.148.40:9006/api/osint-man/v1/filters', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const filters = response.data.data.filter(filter => 
          Array.isArray(filter["case id"]) && 
          filter["case id"].includes(String(caseData1.id))
        );
        const initialIds = filters.map(f => f.id);
        setInitialSelectedFilters(initialIds);
        setSelectedFilters(initialIds);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
    fetchInitialFilters();
  }, [caseData1.id, token]);

  // Handler for filter toggle
  const handleFilterToggle = (filterId, isChecked) => {
    setSelectedFilters(prev => 
      isChecked ? [...prev, filterId] : prev.filter(id => id !== filterId)
    );
  };

  // Handler for new filter creation
  const handleNewFilterCreated = (newFilterId) => {
    setSelectedFilters(prev => [...prev, newFilterId]);
  };

  // Proceed handler
  const handleProceed = async () => {
    const filtersToStart = selectedFilters.filter(id => !initialSelectedFilters.includes(id));
    const filtersToStop = initialSelectedFilters.filter(id => !selectedFilters.includes(id));
console.log("filterToStop", filtersToStop)
    try {
      // Start new filters
      if (filtersToStart.length > 0) {
        await axios.post('http://5.180.148.40:9006/api/osint-man/v1/start', {
          filter_id: filtersToStart,
          case_id: String(caseData1.id),
          interval: 10
        }, { headers: { Authorization: `Bearer ${token}` } });
        window.dispatchEvent(new Event('databaseUpdated'));
      }

      // Stop deselected filters
      if (filtersToStop.length > 0) {
        await axios.post('http://5.180.148.40:9006/api/osint-man/v1/stop/batch', {
          filter_id_list: filtersToStop
        }, { headers: { Authorization: `Bearer ${token}`,
        "Content-Type": "application/json" } });
      }

      // Update case status
    

      // Refresh data and close popup
      window.dispatchEvent(new Event('databaseUpdated'));
      togglePopup();
    } catch (error){
      if (error.response) {
        console.error("Error Status:", error.response.status);
        console.error("Error Data:", error.response.data);
        toast.error(`Error: ${error.response.data.detail || error.message}`);
      } else if (error.request) {
        console.error("No Response:", error.request);
      } else {
        console.error("Request Error:", error.message);
      }
    }
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-container" style={{width: '50%'}}>
          <button className="close-icon" onClick={togglePopup}>&times;</button>
          <div className="popup-content">
            <div className="container-fluid p-4 main-body-div">
              <div className="row main-body-div-1st-row">
                <div className="col-md-4">
                  <button className='add-new-filter-button' onClick={toggleAddFilter}>
                    <Plus/> Add New Filter
                  </button>
                  <ExistingFilters 
                    selectedFilters={selectedFilters}
                    onFilterToggle={handleFilterToggle}
                  />
                </div>
                {showAddFilter && (
                  <div className="col-md-8" style={{marginTop: "-15px"}}>
                    <button onClick={() => setShowAddFilter(false)} className="btn close-add-filter-button">
                      <X/>
                    </button>
                    <AddNewFilter onNewFilterCreated={handleNewFilterCreated}/>
                  </div>
                )}
              </div>
              <div className="text-end mt-3">
                <button className="add-new-filter-button" onClick={handleProceed}>
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddFilter2