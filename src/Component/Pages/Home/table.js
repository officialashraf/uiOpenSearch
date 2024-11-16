import React, { useState } from 'react';
import { Table, InputGroup, FormControl, Dropdown, Button, DropdownButton } from 'react-bootstrap';
import { Search, List, CardList, Plus, ThreeDotsVertical } from 'react-bootstrap-icons';
import '../../../Assets/Stlyes/table.css';

const DataTable= ()=> {
  const [data] = useState([
    { id: 1, title: 'Case A', createdOn: '2023-11-01', createdBy: 'Alice', modifiedOn: '2023-11-02', status: 'On Hold', description: 'Sample description' },
    { id: 2, title: 'Case B', createdOn: '2023-11-03', createdBy: 'Bob', modifiedOn: '2023-11-04', status: 'Progress', description: 'Another sample description' },
    { id: 3, title: 'Case C', createdOn: '2023-11-03', createdBy: 'Neck', modifiedOn: '2023-11-04', status: 'Close', description: 'Another sample description' },
    { id: 4, title: 'Case D', createdOn: '2023-11-03', createdBy: 'Sam', modifiedOn: '2023-11-04', status: 'Progress', description: ' Another sample description Another sample description' },
    // Add more data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchValue) ||
      item.id.toString().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const handleStatusChange = (id, status) => {
    setFilteredData(filteredData.map(item => (item.id === id ? { ...item, status } : item)));
  };

  return (
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
          <Button variant="outline-dark" className="header-icon">
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
            <th> Title</th>
            <th>Created On</th>
            <th>Created By</th>
            <th>Modified On</th>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.createdOn}</td>
              <td>{item.createdBy}</td>
              <td>{item.modifiedOn}</td>
              <td>
                <Dropdown onSelect={(status) => handleStatusChange(item.id, status)}>
                  <Dropdown.Toggle variant="outline-dark" size="sm">
                    {item.status}
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="outline-dark" size="sm">
                    <Dropdown.Item eventKey="On Hold">On Hold</Dropdown.Item>
                    <Dropdown.Item eventKey="Close">Close</Dropdown.Item>
                    <Dropdown.Item eventKey="Progress">Progress</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DataTable;
