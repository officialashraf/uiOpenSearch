import React from 'react'
import { useState } from 'react';
import { //Tooltip, OverlayTrigger,
     Dropdown, Form, InputGroup } from "react-bootstrap";

const AddNewFilter = () => {
    const [sourceExpand, setSourceExpand] = useState(true);
  
    const [value, setValue] = useState("0");
  
    const [searchTerm, setSearchTerm] = useState("");
    //const [selectedKeywords, setSelectedKeywords] = useState([]);
    
    const handleSearch = (e) => {
      setSearchTerm(e.target.value.toLowerCase());
    };
  
    const data = [
        {
          category: "Terrorist weapons",
          items: [{ name: "Bomb 1", type: "Keyword" }],
        },
        {
          category: "Explosive devices",
          items: [{ name: "Bomb 2", type: "Keyword" }, { name: "Bomb 3", type: "Keyword" }],
        },
        {
          category: "Subcategory",
          items: [
            { name: "Bomb", type: "123 keywords" },
            { name: "Bomb Blast", type: "123 keywords" },
            { name: "Terrorist weapons", type: "123 keywords" },
            { name: "Explosive devices", type: "123 keywords" },
          ],
        },
      ];
  return (
    <>
     <form>
            <div className="mb-3">
            <label htmlFor="filterName" className="form-label">
                Filter Name
            </label>
            <input type="text" className="form-control filter-name-input" id="filterName" />
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">
                Description
            </label>
            <textarea
                className="form-control description-text-area" 
                id="description"
                rows="3"
                maxLength="1000"
            ></textarea>
            </div>

            <div className={"container-fluid mb-3 source-container " + (sourceExpand ? "source-container-expanded" : "source-container-collapsed")} >

            <div className="row">
    
        <div className="col-md-6">

            <label htmlFor="source" className="form-label source-label">
                Source
            </label>
                <select onChange={()=>(setSourceExpand(!sourceExpand))} className="form-select source-select" id="source" >
                <option value="">Select</option>
                <option value="source1" >Social Media</option>
                <option value="source2">Rss</option>
                </select>
        </div>
        
        { sourceExpand && (
            <div className="col-md-6">

            <label htmlFor="platform" className="form-label source-label">
                Platform
            </label>
                <select className="form-select source-select" id="platform" >
                <option value="">Select</option>
                <option value="source1" >platform1</option>
                <option value="source2">platform2</option>
                </select>
                
            </div>)}
            </div>
            { sourceExpand && (
            <div className="row">
        <div className="col-md-6">

            <label htmlFor="keywords" className="form-labell source-label">
                Keywords
            </label>
            <Dropdown className="w-100 keywords-dropdown" id="keywords" >
    <Dropdown.Toggle className="w-100 keywords-dropdown-toggle" variant="outline-secondary"  >
        Select Keywords
    </Dropdown.Toggle>
    <Dropdown.Menu className="w-100 p-2 keywords-dropdown-menu">
        {/* Search Bar */}
        <InputGroup className="mb-2">
        <Form.Control
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
        />
        </InputGroup>

        {/* List Items */}
        {data.map((group, index) => (
        <div key={index}>
            <div className="fw-bold">{group.category}</div>
            {group.items
            .filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, idx) => (
                <div key={idx} className="d-flex align-items-center">
                <Form.Check
                    type="checkbox"
                    className="me-2"
                   // checked={selectedKeywords.includes(item.name)}
                    //onChange={() => handleSelection(item.name)}
                />
                <div className="d-flex justify-content-between w-100 ">
                    <span>{item.name}</span>
                    <span className='dd-opts-metadata'>{item.type}</span>
                </div>
                </div>
            ))}
            <hr />
        </div>
        ))}
    </Dropdown.Menu>
    </Dropdown>
        </div>

        <div className="col-md-6">
            <label htmlFor="monitor" className="form-label source-label">
                Monitoring Interval
            </label>
        <div className="row" style={{position:"relative", top:"-1px"}} id="monitor">
            <div className="col-md-6" st>
        <input

    className="form-control me-2 monitoring-interval-input"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    
    />
    </div>
    <div className="dropdown col-md-6">
    <select className="form-select monitoring-interval-options" id="source" >
                <option value="source1" selected >secs</option>
                <option value="source2">mins</option>
                <option value="source2">hrs</option>
                </select>
    </div>
                
            </div>
            </div>
            </div>
    )}
            </div>
            <button type="button" className="btn btn-secondary add-new-filter-button">
            Save and Add
            </button>
        </form>
    </>
  )
}

export default AddNewFilter
