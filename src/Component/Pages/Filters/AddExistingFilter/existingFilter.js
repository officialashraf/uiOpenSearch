import React from 'react'
import { useState } from 'react'
import { Tooltip, OverlayTrigger} from "react-bootstrap";
import { SortDown, Search } from 'react-bootstrap-icons'

const ExistingFilter = () => {
    const [filters, setFilters] = useState([
        { id: 1, name: "Ukraine War", created: "10/04/2024", modified: "19/04/2024", owner:"anon", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit." },
        { id: 2, name: "Russia Attack", created: "11/04/2024", modified: "20/04/2024", owner:"anon", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit." },
        { id: 3, name: "Israel Scene", created: "12/04/2024", modified: "21/04/2024", owner:"anon", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit." },
        { id: 4, name: "MP Riots etc", created: "13/04/2024", modified: "22/04/2024", owner:"anon", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit." },
        { id: 5, name: "Beirut Port Explosion", created: "14/04/2024", modified: "23/04/2024", owner:"anon", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit." },
        ]);
    
        const [searchQuery, setSearchQuery] = useState("");
        const [searchBarVisibility, setSearchBarVisibility] = useState(false);
    
        const toggleSearchBar = () => {
            setSearchBarVisibility(!searchBarVisibility);
          };
        
          // Search filters
          const handleSearch = (e) => {
            setSearchQuery(e.target.value.toLowerCase());
          };
        
          // Sort filters alphabetically
          const sortFilters = () => {
            const sortedFilters = [...filters].sort((a, b) =>
              a.name.localeCompare(b.name)
          );
            setFilters(sortedFilters);
          };
        
        
          // Filtered filters based on search query
          const filteredFilters = filters.filter((filter) =>
            filter.name.toLowerCase().includes(searchQuery)
          );
  return (
   <>
   <div className="col-md-4 ">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Existing Filters</h5>
            <div>
              {
                searchBarVisibility &&
                <input
           
                className="search_input"
                placeholder="Search..."
                onChange={handleSearch}
                />
              }
              <span> < Search onClick={toggleSearchBar} /></span>
              <button className="btn btn-sm me-2 sort-filters" onClick={sortFilters}>
              <SortDown/>
              </button>
            </div>
          </div>
          <ul className="list-group existing-filters-ul" >
            {filteredFilters.map((filter) => (
              <li key={filter.id} className="list-group-item existing-filters-li" >
                <input type="checkbox" className="form-check-input me-2" />
                <span>{filter.name} <OverlayTrigger placement="right" overlay={<Tooltip>created: {filter.created} <br /> modified: {filter.modified} </Tooltip>}><i className="fas fa-circle-info"></i></OverlayTrigger> </span>
                <p className='existing-filters-li-p'>owner:  {filter.owner}</p>
                <p className='existing-filters-li-p'>{filter.description}</p>
              </li>
            ))}
          </ul>
        </div>
   </>
  )
}

export default ExistingFilter
