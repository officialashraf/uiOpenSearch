
// import axios from 'axios';
// import React from 'react'
// import { useState, useEffect} from 'react'
// import { Tooltip, OverlayTrigger} from "react-bootstrap";
// import { SortDown, Search, InfoCircle } from 'react-bootstrap-icons'
// import { useSelector, useDispatch } from 'react-redux';
// import { logFilterCount } from '../../../../Redux/Action/filterAction';
//   import Cookies from 'js-cookie';
 
// const ExistingFilter = () => {
//   const dispatch = useDispatch();
//   const caseId = useSelector((state) => state.caseData.caseData.id);
//   const [filterdata, setfilterdata] = useState([])
//   const token = Cookies.get('accessToken');
//     const [filters, setFilters] = useState([
//         { id: 1, name: "Ukraine War", created: "ashraf", modified: "ashraf", owner:"anon", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//         { id: 2, name: "Russia Attack", created: "11/04/2024", modified: "20/04/2024", owner:"anon", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//         { id: 3, name: "Israel Scene", created: "12/04/2024", modified: "21/04/2024", owner:"anon", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//         { id: 4, name: "MP Riots etc", created: "13/04/2024", modified: "22/04/2024", owner:"anon", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//         { id: 5, name: "Beirut Port Explosion", created: "14/04/2024", modified: "23/04/2024", owner:"anon", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//         { id: 6, name: "Beirut Port ", created: "14/04/2024", modified: "23/04/2024", owner:"anon", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//         ]);
    
//         const [searchQuery, setSearchQuery] = useState("");
//         const [searchBarVisibility, setSearchBarVisibility] = useState(false);
    
//         const toggleSearchBar = () => {
//             setSearchBarVisibility(!searchBarVisibility);
//           };
        
//           // Search filters
//           const handleSearch = (e) => {
//             setSearchQuery(e.target.value.toLowerCase());
//           };
//          console.log("case", caseId)
//           // Sort filters alphabetically
//           const sortFilters = () => {
//             const sortedFilters = [...filters].sort((a, b) =>
//               a.name.localeCompare(b.name)
//           );
//             setFilters(sortedFilters);
//           };
        
        
//           // Filtered filters based on search query
//           // const filteredFilters = 
//           filters.filter((filter) =>
//             filter.name.toLowerCase().includes(searchQuery)
//           );

//           const filterData = async () => {
//              try { 
//               const response = await axios.get(`http://5.180.148.40:9006/api/osint-man/v1/filters`,{
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${token}`,
//                 },
//               });
//                const user = response.data;
//                console.log("filterData1", response.data)
//                dispatch(logFilterCount(user));
//               //  setRefresh(true);
//                 setfilterdata(user); // Update the state with usered data
//                  } catch (error) { 
//                   console.error('There was an error usering the data!', error); 
//                 } 
//               };
             
          
//             useEffect(() => {
//               filterData()
//               const handleDatabaseUpdate = () => {
//                   filterData()
//               };
      
//               window.addEventListener("databaseUpdated", handleDatabaseUpdate);
      
//               return () => {
//                   window.removeEventListener("databaseUpdated", handleDatabaseUpdate);
//               };
//           }, []);
//           console.log("filter", filterdata)
//           const caseIde = String(caseId);

//           // Ensure filterdata is an array before filtering
//           const matchingFilters = Array.isArray(filterdata.data) ? 
//           filterdata.data.filter((filter) =>
//             Array.isArray(filter["case id"]) && filter["case id"].includes(String(caseIde))
//           ) : [];
        
          
//           //const numberOfFilters = filtersWithCaseId.length;
          
//           console.log("Number of filters containing caseId:", matchingFilters);
//          // console.log("Filters containing caseId:", filtersWithCaseId);
          
      
          

//   return (
//    <>
//        <div style={{ display: 'flex', alignItems: 'center', width: '150px' }}>
//   <p style={{ margin: '0' }}>Existing Filters</p>
//   {searchBarVisibility && (
//     <input
//       className="search_input"
//       placeholder="Search..."
//       onChange={handleSearch}
//       style={{ marginLeft: 'auto' }}
//     />
//   )}
//  {!searchBarVisibility && (
//     <span style={{ marginLeft: '40px', marginRight: '0' }}>
//       <Search onClick={toggleSearchBar} style={{ width: '10px' }} />
//     </span>
//   )}
//   <button
//     className="btn btn-sm me-2 sort-filters"
//     onClick={sortFilters}
//     style={{ marginLeft: '0', marginRight: '0', width: '10px'}}
//   >
//     <SortDown />
//   </button>
// </div>
//            <div className='exist-filter'>
//           <ul className="list-group existing-filters-ul" >
//         {filterdata.data && filterdata.data.length > 0 ? (
//          filterdata.data && filterdata.data.map((filter) => (
//           <li key={filter.id} className="list-group-item existing-filters-li">
//             <input type="checkbox" className="form-check-input me-2" />
//             <span>
//               {filter.name}
//               <OverlayTrigger
//                 placement="right"
//                 overlay={
//                   <Tooltip id={`tooltip-${filter.id}`}>
//                     created: {filter.created_by} <br />
//                     modified: {filter.modified_on}
//                   </Tooltip>
//                 }
//                 trigger={['hover', 'focus']}
//               >
//                 <InfoCircle style={{ color: 'black', fontSize: '1rem', cursor: 'pointer', marginLeft:".2rem" }} />
//               </OverlayTrigger>
//             </span>
//             <p className="existing-filters-li-p">owner: {filter.created_by}</p>
//             <p className="existing-filters-li-p">description:{filter.description}</p>
//           </li>
//         ))
//       ) : (
//         <li className="list-group-item existing-filters-li" style={{display: 'flex',height:"400px", justifyContent: 'center', alignItems: 'center', border:"none"}}>
//           <p>No filters created yet</p>
//         </li>
//       )}  
//        {/* <ul>
//       {filterdata.data && filterdata.data.map(item => (
//         <li key={item.id}>
//           <strong>ID:</strong> {item.id.slice(0,6)}, <strong>Name:</strong> {item.name}, <strong>Description:</strong> <p>this our lerome opesunm filter qwerty rathsm noone yateker</p>
//         </li>
//       ))}
//     </ul> */}
//           </ul>
//           </div>
        
//    </>
//   )
// }

// export default ExistingFilter



import axios from 'axios';
import React from 'react'
import { useState, useEffect} from 'react'
import { Tooltip, OverlayTrigger} from "react-bootstrap";
import { SortDown, Search, InfoCircle } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux';
import { logFilterCount } from '../../../../Redux/Action/filterAction';
import Cookies from 'js-cookie';
 
// const ExistingFilter = () => {
//   const dispatch = useDispatch();
//   const caseId = useSelector((state) => state.caseData.caseData.id);
//   const [filterdata, setfilterdata] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchBarVisibility, setSearchBarVisibility] = useState(false);
//   const token = Cookies.get('accessToken');

//   const toggleSearchBar = () => {
//     setSearchBarVisibility(!searchBarVisibility);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const sortFilters = () => {
//     if (filterdata.data) {
//       const sortedFilters = [...filterdata.data].sort((a, b) =>
//         a.name.localeCompare(b.name)
//       );
//       setfilterdata({ ...filterdata, data: sortedFilters });
//     }
//   };

//   const filterData = async () => {
//     try { 
//       const response = await axios.get(`http://5.180.148.40:9006/api/osint-man/v1/filters`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       const user = response.data;
//       dispatch(logFilterCount(user));
//       setfilterdata(user);
//     } catch (error) { 
//       console.error('There was an error fetching the data!', error); 
//     } 
//   };

//   useEffect(() => {
//     filterData();
//     const handleDatabaseUpdate = () => {
//       filterData();
//     };

//     window.addEventListener("databaseUpdated", handleDatabaseUpdate);

//     return () => {
//       window.removeEventListener("databaseUpdated", handleDatabaseUpdate);
//     };
//   }, []);

//   // Check if filter belongs to current case
//   const isFilterInCurrentCase = (filter) => {
//     return Array.isArray(filter["case id"]) && 
//            filter["case id"].includes(String(caseId));
//   };

//   return (
//     <>
//       <div style={{ display: 'flex', alignItems: 'center', width: '150px' }}>
//         <p style={{ margin: '0' }}>Existing Filters</p>
//         {searchBarVisibility && (
//           <input
//             className="search_input"
//             placeholder="Search..."
//             onChange={handleSearch}
//             style={{ marginLeft: 'auto' }}
//           />
//         )}
//         {!searchBarVisibility && (
//           <span style={{ marginLeft: '40px', marginRight: '0' }}>
//             <Search onClick={toggleSearchBar} style={{ width: '10px' }} />
//           </span>
//         )}
//         <button
//           className="btn btn-sm me-2 sort-filters"
//           onClick={sortFilters}
//           style={{ marginLeft: '0', marginRight: '0', width: '10px'}}
//         >
//           <SortDown />
//         </button>
//       </div>
//       <div className='exist-filter'>
//         <ul className="list-group existing-filters-ul">
//           {filterdata.data && filterdata.data.length > 0 ? (
//             filterdata.data
//               .filter(filter => filter.name.toLowerCase().includes(searchQuery))
//               .map((filter) => (
//                 <li key={filter.id} className="list-group-item existing-filters-li">
//                   <input 
//                     type="checkbox" 
//                     className="form-check-input me-2" 
//                     defaultChecked={isFilterInCurrentCase(filter)}
//                   />
//                   <span>
//                     {filter.name}
//                     <OverlayTrigger
//                       placement="right"
//                       overlay={
//                         <Tooltip id={`tooltip-${filter.id}`}>
//                           created: {filter.created_by} <br />
//                           modified: {filter.modified_on}
//                         </Tooltip>
//                       }
//                       trigger={['hover', 'focus']}
//                     >
//                       <InfoCircle style={{ color: 'black', fontSize: '1rem', cursor: 'pointer', marginLeft:".2rem" }} />
//                     </OverlayTrigger>
//                   </span>
//                   <p className="existing-filters-li-p">owner: {filter.created_by}</p>
//                   <p className="existing-filters-li-p">description:{filter.description}</p>
//                 </li>
//               ))
//           ) : (
//             <li className="list-group-item existing-filters-li" style={{display: 'flex',height:"400px", justifyContent: 'center', alignItems: 'center', border:"none"}}>
//               <p>No filters created yet</p>
//             </li>
//           )}
//         </ul>
//       </div>
//     </>
//   );
// }

// export default ExistingFilter;


const ExistingFilter = ({ selectedFilters, onFilterToggle }) => {
  const dispatch = useDispatch();
  const caseId = useSelector((state) => state.caseData.caseData.id);
  const [filterdata, setfilterdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);
  const token = Cookies.get('accessToken');

  const toggleSearchBar = () => {
    setSearchBarVisibility(!searchBarVisibility);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const sortFilters = () => {
    if (filterdata.data) {
      const sortedFilters = [...filterdata.data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setfilterdata({ ...filterdata, data: sortedFilters });
    }
  };

  const filterData = async () => {
    try { 
      const response = await axios.get(`http://5.180.148.40:9006/api/osint-man/v1/filters`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const user = response.data;
      dispatch(logFilterCount(user));
      setfilterdata(user);
    } catch (error) { 
      console.error('There was an error fetching the data!', error); 
    } 
  };

  useEffect(() => {
    filterData();
    const handleDatabaseUpdate = () => {
      filterData();
    };

    window.addEventListener("databaseUpdated", handleDatabaseUpdate);

    return () => {
      window.removeEventListener("databaseUpdated", handleDatabaseUpdate);
    };
  }, []);

  // Check if filter belongs to current case
  const isFilterInCurrentCase = (filter) => {
    return Array.isArray(filter["case id"]) && 
           filter["case id"].includes(String(caseId));
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', width: '185px' }}>
        <p style={{ margin: '0' }}>Existing Filters</p>
        {searchBarVisibility && (
          <input
            className="search_input"
            placeholder="Search..."
            onChange={handleSearch}
            style={{ marginLeft: 'auto' }}
          />
        )}
        {!searchBarVisibility && (
          <span style={{ marginLeft: '40px', marginRight: '0' }}>
            <Search onClick={toggleSearchBar} style={{ width: '10px' }} />
          </span>
        )}
        <button
          className="btn btn-sm me-2 sort-filters"
          onClick={sortFilters}
          style={{ marginLeft: '0', marginRight: '0', width: '10px'}}
        >
          <SortDown />
        </button>
      </div>
      <div className='exist-filter'>
        <ul className="list-group existing-filters-ul">
          {filterdata.data && filterdata.data.length > 0 ? (
            filterdata.data
              .filter(filter => filter.name.toLowerCase().includes(searchQuery))
              .map((filter) => (
                <li key={filter.id} className="list-group-item existing-filters-li">
                  <input 
                    type="checkbox" 
                    className="form-check-input me-2" 
                    defaultChecked={isFilterInCurrentCase(filter)}
                    checked={selectedFilters.includes(filter.id)}
                    onChange={(e) => onFilterToggle(filter.id, e.target.checked)}
                  />
                  <span>
                    {filter.name}
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id={`tooltip-${filter.id}`}>
                          created: {filter.created_by} <br />
                          modified: {filter.modified_on}
                        </Tooltip>
                      }
                      trigger={['hover', 'focus']}
                    >
                      <InfoCircle style={{ color: 'black', fontSize: '1rem', cursor: 'pointer', marginLeft:".2rem" }} />
                    </OverlayTrigger>
                  </span>
                  <p className="existing-filters-li-p">owner: {filter.created_by}</p>
                  <p className="existing-filters-li-p">description:{filter.description}</p>
                </li>
              ))
          ) : (
            <li className="list-group-item existing-filters-li" style={{display: 'flex',height:"400px", justifyContent: 'center', alignItems: 'center', border:"none"}}>
              <p>No filters created yet</p>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default ExistingFilter;