
import axios from 'axios';
import React from 'react'
import { useState, useEffect} from 'react'
import { Tooltip, OverlayTrigger} from "react-bootstrap";
import { SortDown, Search, InfoCircle } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux';
import { logFilterCount } from '../../../../Redux/Action/filterAction';
import Cookies from 'js-cookie';
import Loader from '../../Layout/loader.js'
 
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
  const [loading, setLoading] = useState(true);
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

  // const sortFilters = () => {
  //   if (filterdata.data) {
  //     const sortedFilters = [...filterdata.data].sort((a, b) => {
  //       const aChecked = selectedFilters.includes(a.id) ? 0 : 1;
  //       const bChecked = selectedFilters.includes(b.id) ? 0 : 1;
  
  //       if (aChecked !== bChecked) return aChecked - bChecked;
  //       return a.name.localeCompare(b.name);
  //     });
  
  //     setfilterdata({ ...filterdata, data: sortedFilters });
  //   }
  // };

  const filterData = async () => {
    setLoading(true);
    try { 
      const response = await axios.get(`http://5.180.148.40:9006/api/osint-man/v1/filters`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("resposneFilter data", response)
      const user = response.data;
      const sortedFilters = user.data.sort((a, b) => {
        const aInCurrentCase = isFilterInCurrentCase(a);
        const bInCurrentCase = isFilterInCurrentCase(b);

        if (aInCurrentCase && !bInCurrentCase) return -1;
        if (!aInCurrentCase && bInCurrentCase) return 1;

        return a.name.localeCompare(b.name);
      });
      dispatch(logFilterCount(user));
      //setfilterdata(user);
      setfilterdata({ ...user, data: sortedFilters });
    } catch (error) { 
      console.error('There was an error fetching the data!', error); 
    } finally {
      setLoading(false);
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
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center",marginTop:'8rem'}}> 
           <Loader/>
           </div>
        ) : (
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
                        trigger={["hover", "focus"]}
                      >
                        <InfoCircle style={{ color: "black", fontSize: "1rem", cursor: "pointer", marginLeft: ".2rem" }} />
                      </OverlayTrigger>
                    </span>
                    <p className="existing-filters-li-p">owner: {filter.created_by}</p>
                    <p className="existing-filters-li-p">description: {filter.description}</p>
                  </li>
                ))
            ) : (
              <li className="list-group-item existing-filters-li" style={{ display: "flex", height: "400px", justifyContent: "center", alignItems: "center", border: "none" }}>
                <p>No filters created yet</p>
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export default ExistingFilter;