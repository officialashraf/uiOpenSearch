import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../Assets/Stlyes/searchBar.css';
import { Search } from 'react-bootstrap-icons';

const SearchBar = () => {
  const [data, setData] = useState([]); // Original data
  const [filteredResults, setFilteredResults] = useState([]); // Displayed results
  const [searchType, setSearchType] = useState('name'); // Default search type
  const [query, setQuery] = useState(''); // Search query

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        setData(response.data); // Set original data
        setFilteredResults(response.data); // Initially show all data
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Handle dropdown selection change
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  // Handle query input change
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  // Filter results based on search query
  const handleSearch = () => {
    if (query.trim() === '') {
      setFilteredResults(data); // Show all data if query is empty
    } else {
      const filteredData = data.filter((user) =>
        user[searchType]?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filteredData);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <select value={searchType} onChange={handleSearchTypeChange} className="search-dropdown">
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Mobile</option>
          <option value="aadhar number">Aadhar Number</option>
          <option value="ip address">IP Address</option>
          <option value="keyword">Keyword</option>
          
        </select>
        
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder={`Enter ${searchType} to search`}
          className="search-input"
        />
        <Search onClick={handleSearch}  color="gray" size="24" />

      </div>
      <button onClick={handleSearch} className="search-button">
          Search
        </button>
      {/* Display results in table format */}
     
      <div className="search-results">
  {filteredResults.length > 0 ? (
    <table className="results-table">
      <thead>
        <tr>
        <th>S.No.</th>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {filteredResults.map((result) => (
          <React.Fragment key={result.id}>
            <tr>
              <td>{result.id}</td>
              <td>Name</td>
              <td>{result.name}</td>
            </tr>
            <tr>
              
            </tr>
            <tr>
              <td>{}</td>
              <td>Email</td>
              <td>{result.email}</td>
            </tr>
            <tr>
            <td>{}</td>
              <td>Phone</td>
              <td>{result.phone}</td>
            </tr>
            
            <tr>
            <td>{}</td>
              <td>Location</td>
              <td>{result.address.city}</td>
            </tr>
            <tr>
            <td>{}</td>
              <td>Aadhar Number</td>
              <td>{result.aadharnumber}</td>
            </tr>
            <tr>
            <td>{}</td>
              <td>Education</td>
              <td>{result.education}</td>
            </tr>
            <tr>
            <td>{}</td>
              <td>RelationShip</td>
              <td>{result.education}</td>
            </tr>
            <tr>
            <td>{}</td>
              <td>TSP</td>
              <td>{result.tsp}</td>
            </tr>
            <tr>
            <td>{}</td>
              <td>Photo</td>
              <td>{result.photo}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No results found</p>
  )}
  <button className="create-case-button">Create Case</button>
</div>


    </div>
  );
};

export default SearchBar;

