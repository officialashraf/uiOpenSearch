import React, { useState, useEffect, useCallback } from 'react';
import { Table, InputGroup, FormControl, Dropdown, DropdownButton, Badge } from 'react-bootstrap';
import { Search, List, CardList, Plus, ThreeDotsVertical } from 'react-bootstrap-icons';
import axios from 'axios';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import '../../../Assets/Stlyes/table.css';
import CreateCase from '../Case/createCase';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CaseDetails from './caseDetails';
import EditCase from './editCase';
import { useDispatch } from 'react-redux';
import { setCaseData } from '../../../Redux/Action/caseAction';

const DataTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupA, setShowPopupA] = useState(false);
  const [showPopupB, setShowPopupB] = useState(false);
  const [selectedData, setSelectedData] = useState(null);



  const onFieldClick = (item) => {
    dispatch(setCaseData(item));
    const caseId = item.id // Set the case data in Redux store
    navigate(`/cases/${caseId}`); // Navigate to the new page
  };
  console.log("onfield", onFieldClick)
  console.log("dfdf", setCaseData())
  const fetchData = async () => {
    try {
      const Token = Cookies.get('accessToken');
      const response = await axios.get('http://5.180.148.40:8008/api/case-service/cases',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          },
        });

      setData(response.data.data);
      setFilteredData(response.data.data);
      console.log("data", response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchCaseData = useCallback(() => {
    console.log("Filtering data...");
    fetchData();
  }, [data]);

  useEffect(() => {
    if (refresh) {
      fetchCaseData(); // Runs only when refresh changes
      setRefresh(false); // Reset refresh state after running
    }
  }, [refresh]);




  const confirmDelete = (id) => {
    toast((t) => (
      <div>
        <p>Are you sure you want to delete this case?</p>
        <button className='custom-confirm-button' onClick={() => { deleteCase(id); toast.dismiss(t.id); }}>Yes</button>
        <button className='custom-confirm-button' onClick={() => toast.dismiss(t.id)}>No</button> </div>),
      { position: "top-right", autoClose: false, closeOnClick: false, draggable: false, });
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
      setRefresh(true);
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

  // const handleStatusChange = (id, status) => {
  //   setFilteredData(filteredData.map(item => (item.id === id ? { ...item, status } : item)));
  // };

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


  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredData(sortedData);
  }
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



            {/* <span className="custom-confirm-button" title='Add New Case'  onClick={togglePopup}><Plus size={30}/>Add New Case</span>  */}
            <button className='add-btn' title='Add New Case' onClick={togglePopup}><Plus size={20} />Add New Case</button>

            <DropdownButton className="custom-dropdown1" align="end" title={<ThreeDotsVertical size={24} />} id="dropdown-menu-align-end">
              <Dropdown.Item href="#">Option 1</Dropdown.Item>
              <Dropdown.Item href="#">Option 2</Dropdown.Item>
              <Dropdown.Item href="#">Option 3</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="data-table">
          <Table striped bordered hover variant="light"  >
            <thead>
              <tr>
                <th>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    S.No.
                    <span onClick={() => handleSort('index')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      {sortConfig.key === 'index' ? (
                        sortConfig.direction === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />
                      ) : <ArrowDropDown />}
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    CaseId
                    <span onClick={() => handleSort('id')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      {sortConfig.key === 'id' ? (
                        sortConfig.direction === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />
                      ) : <ArrowDropDown />}
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Title
                    <span onClick={() => handleSort('title')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      {sortConfig.key === 'title' ? (
                        sortConfig.direction === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />
                      ) : <ArrowDropDown />}
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Created On
                    <span onClick={() => handleSort('created_on')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      {sortConfig.key === 'created_on' ? (
                        sortConfig.direction === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />
                      ) : <ArrowDropDown />}
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Created By
                    <span onClick={() => handleSort('created_by')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      {sortConfig.key === 'created_by' ? (
                        sortConfig.direction === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />
                      ) : <ArrowDropDown />}
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Assignee
                    <span onClick={() => handleSort('assignee')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      {sortConfig.key === 'assignee' ? (
                        sortConfig.direction === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />
                      ) : <ArrowDropDown />}
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Watchers
                    <span onClick={() => handleSort('watchers')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      {sortConfig.key === 'watchers' ? (
                        sortConfig.direction === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />
                      ) : <ArrowDropDown />}
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Modified On
                    <span onClick={() => handleSort('modified_on')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      {sortConfig.key === 'modified_on' ? (
                        sortConfig.direction === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />
                      ) : <ArrowDropDown />}
                    </span>
                  </div>
                </th>
                <th className="sticky-column">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Status
                    <span onClick={() => handleSort('status')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      {sortConfig.key === 'status' ? (
                        sortConfig.direction === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />
                      ) : <ArrowDropDown />}
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Description
                    <span onClick={() => handleSort('description')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                      {sortConfig.key === 'description' ? (
                        sortConfig.direction === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />
                      ) : <ArrowDropDown />}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className='tb-1'>
              {filteredData && filteredData.map((item, index) => (
                <tr key={item.id} >
                  <td>{index + 1}.</td>
                  <td onClick={() => onFieldClick(item)} style={{ cursor: 'pointer' }} >{item.id.slice(0, 8)}</td>
                  <td>{item.title}</td>
                  <td>{item.created_on.slice(0, 10)}</td>
                  <td>{item.created_by.slice(0, 8)}</td>
                  <td>{item.assignee}</td>
                  <td>{item.watchers}</td>
                  <td>{item.modified_on}</td>
                  <td disabled={true} >
                    <Badge pill bg="dark" className="badge-custom">
                      <span><ul><li >{item.status}</li></ul></span>
                    </Badge>
                  </td>
                  <td className="d-flex justify-content-between align-items-center">
                    <span>{item.description}</span>
                    <span> <Dropdown>
                      <Dropdown.Toggle className="custom-dropdown-toggle custom-btn"> ⋮ </Dropdown.Toggle>
                      <Dropdown.Menu className="custom-dropdown-menu">
                        <Dropdown.Item onClick={() => { togglePopupA(item) }} style={{ cursor: "pointer" }}>Details</Dropdown.Item>
                        <Dropdown.Item onClick={togglePopupB} >Edit</Dropdown.Item>
                        <Dropdown.Item
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
      </div>
      {showPopup && <CreateCase togglePopup={togglePopup} />}
      {showPopupB && <EditCase togglePopup={togglePopupB} />}
      {showPopupA && <CaseDetails item={selectedData} togglePopupA={togglePopupA} />}

    </>
  );
};

export default DataTable;
//"69256ec1d45c5b23973b8d44884d5914
// "6b0a297b235c5b719d5b33d605dc3948",
// "2850b434e3aa55ac9bad26a61381deed",
// "0e984e466fd35713a1d876c27ce2d84d",
// "6aa97938a23d526a93a19616a5904d62",
// "3d1ddc358d6f573d80285db381c27d04"
