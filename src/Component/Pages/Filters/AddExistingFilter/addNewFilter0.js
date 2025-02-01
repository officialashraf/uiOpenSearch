import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { //Tooltip, OverlayTrigger,
    Dropdown, Form, InputGroup, Button
} from "react-bootstrap";


const AddNewFilter = () => {
    const [sourceExpand, setSourceExpand] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');
    const [keyValuePairs, setKeyValuePairs] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    //const [selectedKeywords, setSelectedKeywords] = useState([]);

    const handleAddKeyValuePair = () => {
        setKeyValuePairs([...keyValuePairs, { key: newKey, value: newValue }]);
        setNewKey('');
        setNewValue('');
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleKeyChange = (index, newKey) => {
        const updatedPairs = [...keyValuePairs];
        updatedPairs[index].key = newKey;
        setKeyValuePairs(updatedPairs);
    };

    const handlePlatformChange = (e) => {
        setSelectedPlatform(e.target.value);
    }

    const handleValueChange = (index, newValue) => {
        const updatedPairs = [...keyValuePairs]; updatedPairs[index].value = newValue; setKeyValuePairs(updatedPairs);
    };
    
    const handleDeletePair = (index) => {
        const updatedPairs = keyValuePairs.filter((_, i) => i !== index);
        setKeyValuePairs(updatedPairs);
    };
  
    const handleSubmit = async () => {
        const postData = {
          [selectedPlatform]: keyValuePairs.reduce((acc, pair) => {
            acc[pair.key] = pair.value;
            return acc;
          }, {})
        };
    
        try {
          const response = await axios.post('http://5.180.148.40:9002/api/osint/create', 
          postData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Response:filter', response.data);
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };
      
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
                            <select onChange={() => (setSourceExpand(!sourceExpand))} className="form-select source-select" id="source" >
                                <option value="">Select</option>
                                <option value="source1" >Social Media</option>
                                <option value="source2">Rss</option>
                            </select>
                        </div>

                        {sourceExpand && (
                            <div className="col-md-6">

                                <label htmlFor="platform" className="form-label source-label">
                                    Platform
                                </label>
                                <select className="form-select source-select" id="platform" onChange={handlePlatformChange}>
                                    <option value="">Select</option>
                                    <option value="source1" >Twitter</option>
                                    <option value="source2">Instagram</option>
                                </select>

                            </div>)}
                    </div>
                    {selectedPlatform && (
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="keywords" className="form-label source-label">
                                    Keywords
                                </label>
                                <Dropdown className="w-100 keywords-dropdown" id="keywords">
                                    <Dropdown.Toggle className="w-100 keywords-dropdown-toggle" variant="outline-secondary">
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
                
                                        {/* Key-Value Pair Input */}
                                        <div className="d-flex mb-2">
                                            <Form.Control placeholder="Key" value={newKey} onChange={(e) => setNewKey(e.target.value)} className="me-2" />
                                            <Form.Control placeholder="Value" value={newValue} onChange={(e) => setNewValue(e.target.value)} className="me-2" />
                                            <Button variant="outline-secondary" onClick={handleAddKeyValuePair}> Add </Button> </div>
                                        {keyValuePairs.map((pair, index) => (
                                            <div key={index} className="d-flex align-items-center mb-2">
                                                <Form.Check type="checkbox" className="me-2" />
                                                <Form.Control placeholder="Key" value={pair.key} onChange={(e) => handleKeyChange(index, e.target.value)} className="me-2" />
                                                <Form.Control placeholder="Value" value={pair.value} onChange={(e) => handleValueChange(index, e.target.value)} className="me-2" />
                                                <Button variant="outline-danger" onClick={() => handleDeletePair(index)}> Delete </Button> </div>))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    )}
                </div>
                <button type="button" className="btn btn-secondary add-new-filter-button" onClick={handleSubmit}>
                    Save and Add
                </button>
            </form>
        </>
    )
}

export default AddNewFilter
