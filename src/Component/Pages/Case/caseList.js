import React, { useState, useEffect } from 'react';
import { Table, InputGroup, FormControl, Dropdown, Button, DropdownButton } from 'react-bootstrap';
import { Search, List, CardList, Plus, ThreeDotsVertical } from 'react-bootstrap-icons';
import axios from 'axios';
//import {useNavigate}from 'react-router-dom'
import '../../../Assets/Stlyes/table.css';
import CreateCase from '../Case/createCase';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import CaseDetails from './caseDetails';
import EditCase from './editCase';

const DataTable = ({onFieldClick}) => {
  //const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupA, setShowPopupA] = useState(false);
  const [showPopupB, setShowPopupB] = useState(false);
  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get('accessToken');
        const response = await axios.get('http://5.180.148.40:8008/api/case-service/cases',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
          });

        setData(response.data.data);
        setFilteredData(response.data.data);
     console.log("data", response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const interval = setInterval(() =>
       { fetchData(); }, 10000);
    return () => clearInterval(interval);
  },
    []);

    // const filterPage =()=>{
    //   navigate('/filter')
    // }
    const confirmDelete = (id) => { 
      toast((t) => (
         <div> 
          <p>Are you sure you want to delete this case?</p>
           <button className='custom-confirm-button' onClick={() => { deleteCase(id); toast.dismiss(t.id); }}>Yes</button> 
           <button  className='custom-confirm-button'  onClick={() => toast.dismiss(t.id)}>No</button> </div> ),
            { position: "top-center", autoClose: false, closeOnClick: false, draggable: false, });
           };

  const deleteCase = async (id) => {
    const token = Cookies.get("accessToken");
    if (!token) {
      console.error("No token found in cookies.");
      return;
    }
    try {
      const authToken = Cookies.get('accessToken'); // Read the token from cookies 
      const response = await axios.delete(`http://5.180.148.40:8008/api/case-service/cases/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });

      toast("Case Deleted Successfully")
      console.log("Case Deleted:", response.data);

      // After successful deletion, fetch the updated data
      //fetchData(); // Optionally refresh data after deletion

    } catch (error) {
      toast("Error deleting case:", error)
      console.error("Error deleting case:", error);
    }
  };
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);


    const filtered = data.filter((item) => {
      return Object.values(item).some((value) => {
        if (value !== null && value !== undefined) {
          // Convert the value to a string and check if it includes the search value
          return value.toString().toLowerCase().includes(searchValue.toLowerCase());
        }
        return false;
      });
    });
    setFilteredData(filtered);
  };

  const handleStatusChange = (id, status) => {
    setFilteredData(filteredData.map(item => (item.id === id ? { ...item, status } : item)));
  };

  const togglePopup = () => {
   
    setShowPopup((prev) => !prev);
  };  
  const togglePopupB = () => {
   
    setShowPopupB((prev) => !prev);
  }; 
  const togglePopupA = (item) => {
    setShowPopupA((prev) => !prev);
    setSelectedData(item)
  };

  // const handleCaseClick = (item) => {
  //   // setSelectedCase(caseDetails); // Set the selected case
  //   // setIsPopupVisible(true); // Show the popup
  //   console.log("item", item)
  // };

  return (
    <>
      <div className="data-table-container">
        <div className="top-header">
          <InputGroup className="search-bar1">
            <InputGroup.Text className="search-icon"><Search /></InputGroup.Text>
            <FormControl
              placeholder="Search Case"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>

          <div className="header-icons">
            <Button variant="outline-dark" className="header-icon">
              <span className="icon"><List size={20} /></span>
              <span>List View</span>
            </Button>
            <Button variant="outline-dark" className="header-icon">
              <span className="icon"><CardList size={20} /></span>
              <span>Card View</span>
            </Button>
            <Button variant="outline-dark" className="header-icon" onClick={togglePopup}>
              <span className="icon"><Plus size={20} /></span>
              <span>Add New</span>
            </Button>
            <DropdownButton align="end" variant="outline-dark" title={<ThreeDotsVertical size={20} />} id="dropdown-menu-align-end">
              <Dropdown.Item href="#">Option 1</Dropdown.Item>
              <Dropdown.Item href="#">Option 2</Dropdown.Item>
              <Dropdown.Item href="#">Option 3</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <Table striped bordered hover variant="light" responsive className="data-table">
          <thead>
            <tr>
              <th>CaseId</th>
              <th>Title</th>
              <th>Created On</th>
              <th>Created By</th>
              <th>Assignee</th>
              <th>Watchers</th>
              <th>Modified On</th>
              <th className="sticky-column">Status</th>
              <th>Description</th>
             
            </tr>
          </thead>
          <tbody>
            {filteredData && filteredData.map((item) => (
              <tr key={item.id} >
                <td onClick={onFieldClick} style={{cursor :'pointer'}} >{item.id.slice(0, 8)}</td>
                <td>{item.title}</td>
                <td>{item.created_on.slice(0, 10)}</td>
                <td>{item.created_by.slice(0, 8)}</td>
                <td>{item.assignee}</td>
                <td>{item.watchers}</td>
            <td>{item.modified_on}</td>
                <td disabled={true} >
                  <Dropdown onSelect={(status) => handleStatusChange(item.id, status)} >
                    <Dropdown.Toggle variant="outline-dark" size="sm"  >
                      {item.status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                      <Dropdown.Item eventKey="On Hold">On Hold</Dropdown.Item>
                      <Dropdown.Item eventKey="Close">Close</Dropdown.Item>
                      <Dropdown.Item eventKey="Progress">Progress</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td  className="d-flex justify-content-between align-items-center">
                <span>{item.description}</span> 
                <span> <Dropdown>
                   <Dropdown.Toggle className="custom-dropdown-toggle custom-btn"> ⋮ </Dropdown.Toggle>
                 <Dropdown.Menu className="custom-dropdown-menu"> 
                  <Dropdown.Item onClick={() => { togglePopupA(item) }} style={{ cursor: "pointer" }}>Details</Dropdown.Item> 
                  <Dropdown.Item  onClick={togglePopupB} >Edit</Dropdown.Item>
                 <Dropdown.Item  
                // onClick={() => deleteCase(item.id)}
                onClick={() => confirmDelete(item.id)}
                 >Delete</Dropdown.Item> 
                 </Dropdown.Menu> 
                 </Dropdown>  
                 </span>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {showPopup && <CreateCase togglePopup={togglePopup} />}
      {showPopupB && <EditCase togglePopup={togglePopupB} />}
      {showPopupA && <CaseDetails item={selectedData} togglePopupA={togglePopupA} />}
    </>
  );
};

export default DataTable;
