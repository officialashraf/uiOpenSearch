import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Dropdown, Form, InputGroup, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setTaskFilter } from '../../../../Redux/Action/filterAction';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
//import Summary from '../Add_Filter/summary';

const AddNewFilter = () => {


  const [sourceExpand, setSourceExpand] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [keyValuePairs, setKeyValuePairs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterName, setFilterName] = useState('');
  const [taskId, setTaskId] = useState([]);
  const [filterId, setfilterId] = useState('')
  const dispatch = useDispatch();

  const caseData1 = useSelector((state) => state.caseData.caseData);
  localStorage.setItem('taskId', taskId);
  localStorage.setItem('filterId', filterId);
  dispatch(setTaskFilter(taskId, filterId));
  const handleAddKeyValuePair = () => {
    setKeyValuePairs([...keyValuePairs, { key: newKey, value: newValue }]);
    setNewKey('');
    setNewValue('');
  };
  console.log("keyvaluepair", keyValuePairs)

  const handleSourceChange = (event) => {
    const value = event.target.value;
    if (value) {
      setSourceExpand(true);
    }
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
  };

  const handleValueChange = (index, newValue) => {
    const updatedPairs = [...keyValuePairs];
    updatedPairs[index].value = newValue;
    setKeyValuePairs(updatedPairs);
  };

  const handleDeletePair = (index) => {
    const updatedPairs = keyValuePairs.filter((_, i) => i !== index);
    setKeyValuePairs(updatedPairs);
  };

  const addTask = (newTask) => {
    setTaskId((prevTaskId) => [...prevTaskId, newTask]);// Add new task to state
  };





  const handleSubmit = async () => {
    const token = Cookies.get("accessToken");
    const postData = {
      name: filterName,
      case_id: caseData1.id,
      data: {
        [selectedPlatform]: keyValuePairs.reduce((acc, pair, index) => {
          const checkbox = document.getElementById(`checkbox-${index}`);
          console.log(`Checkbox-${index} exists:`, checkbox !== null);
          if (checkbox && checkbox.checked) {
            console.log(`Checkbox-${index} is checked:`, checkbox.checked);
            acc[pair.key] = pair.value;
          }
          return acc;
        }, {})
      }
    };
    console.log("postdata", postData)
    try {
      const response = await axios.post('http://5.180.148.40:9002/api/osint/create', postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:Filter', response);
      setFilterName('');
      setKeyValuePairs([]);
      setSelectedPlatform('');
      setSourceExpand(false);
      if (response.status === 200) {
        toast.success(`Filter Created Successfully ${response.data.data.name}`);
        setfilterId(response.data.data.id);
        console.log("filterId", response.data.data.id)
        try {
          const startResponse = await axios.post(`http://5.180.148.40:9002/api/start-task/${response.data.data.id}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          window.dispatchEvent(new Event("databaseUpdated"));
          console.log('Start Task Response:', startResponse);
          console.log('Start Task ID:', startResponse.data.tasks);
          addTask(startResponse.data.tasks)
          if (startResponse.status === 200) {
            toast.success('Task started successfully');

            try {
              const updateStatusResponse = await axios.put(`http://5.180.148.40:8008/api/case-service/cases/${caseData1.id}`, { status: "Progress" }, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });
              console.log('Update Status Response:', updateStatusResponse);
              if (updateStatusResponse.status === 200) {
                toast.success('Case status updated successfully');
              } else {
                toast.error('Unexpected response from server during status update.');
              }
            } catch (updateError) {
              console.error('Error updating status:', updateError);
              toast.error('Error during status update: ' + (updateError.response?.data?.message || updateError.message));
            }

          } else {
            toast.error('Unexpected response from server during task start.');
          }
        } catch (startError) {
          console.error('Error starting task:', startError);
          toast.error('Error during task start: ' + (startError.response?.data?.message || startError.message));
        }

      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error("Error during case creation: " + (error.response?.data?.message || error.message));
    }
  };


  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="filterName" className="form-label">
            Filter Name 
          </label>
          <input type="text"
            className="form-control filter-name-input"
            id="filterName"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
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
              <select
        placeholder="Select"
        onChange={handleSourceChange}
        className="form-select source-select"
        id="source"
      >
        <option value="" disabled selected>
          Select Source
        </option>
        <option value="source1">Social Media </option>
        <option value="source1">Social Media Profile</option>
        <option value="source2">Rss</option>
      </select>
            </div>
            {sourceExpand && (
        <div className="col-md-6">
          <label htmlFor="platform" className="form-label source-label">
            Platform
          </label>
          <select
            className="form-select source-select"
            id="platform"
            onChange={handlePlatformChange}
          >
            <option value="" disabled selected>
              Select Platform
            </option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>
      )}
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
                    <InputGroup className="mb-2">
                      <Form.Control
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </InputGroup>
                    <div className="d-flex mb-2">
                      <Form.Control placeholder="Key" value={newKey} onChange={(e) => setNewKey(e.target.value)} className="me-2" />
                      <Form.Control placeholder="Value" value={newValue} onChange={(e) => setNewValue(e.target.value)} className="me-2" />
                      <Button variant="outline-secondary" onClick={handleAddKeyValuePair}> Add </Button>
                    </div>
                    {keyValuePairs.map((pair, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        <Form.Check type="checkbox" id={`checkbox-${index}`} className="me-2" />
                        <Form.Control placeholder="Key" value={pair.key} onChange={(e) => handleKeyChange(index, e.target.value)} className="me-2" />
                        <Form.Control placeholder="Value" value={pair.value} onChange={(e) => handleValueChange(index, e.target.value)} className="me-2" />
                        <Button variant="outline-danger" onClick={() => handleDeletePair(index)}> Delete </Button>
                      </div>
                    ))}
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
      {/* <Summary filterId={filterId}/> */}
    </>
  );
};

export default AddNewFilter;
