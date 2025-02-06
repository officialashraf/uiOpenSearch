import React from 'react';
import axios from 'axios';
import { useState,useEffect,useRef } from 'react';
import { Dropdown, Form, InputGroup, Button, Badge } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setTaskFilter } from '../../../../Redux/Action/filterAction';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
//import Summary from '../Add_Filter/summary';

const AddNewFilter = () => {


  const [sourceExpand, setSourceExpand] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
   const [platforms, setPlatforms] = useState([]);
  const [keyValuePairs, setKeyValuePairs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [formData, setFormData] = useState({});
  const [filterName, setFilterName] = useState('');
  const [taskId, setTaskId] = useState([]);
  const [filterId, setfilterId] = useState('')
  const [sources, setSources] = useState([{ source: '', platform: '', keywords: [] }]);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [newKeyword, setNewKeyword] = useState('');
  const containerRef = useRef(null);


  const dispatch = useDispatch();

  const caseData1 = useSelector((state) => state.caseData.caseData);
  localStorage.setItem('taskId', taskId);
  localStorage.setItem('filterId', filterId);
  
  const token = Cookies.get("accessToken");
  dispatch(setTaskFilter(taskId, filterId));
 


  const handleSourceChange = (event) => {
    const value = event.target.value;
    if (value) {
      setSourceExpand(true);
    }
  };
  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value.toLowerCase());
  // };

  // const handleKeyChange = (index, newKey) => {
  //   const updatedPairs = [...keyValuePairs];
  //   updatedPairs[index].key = newKey;
  //   setKeyValuePairs(updatedPairs);
  // };

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

 
  useEffect(() => {
    if (selectedPlatform) {
      setSearchTerm('');
      setNewKeyword('');
    }
  }, [selectedPlatform]);

  const handleAddKeyword = () => {
    const updatedKeywords = formData[selectedPlatform] ? [...formData[selectedPlatform], newKeyword] : [newKeyword];
    setFormData({ ...formData, [selectedPlatform]: updatedKeywords });
    setNewKeyword('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddKeyword();
      e.preventDefault();
    }
  };

  const handleDeleteKeyword = (index) => {
    const updatedKeywords = formData[selectedPlatform].filter((_, i) => i !== index);
    setFormData({ ...formData, [selectedPlatform]: updatedKeywords });
  };

 

  const handleAddSource = () => {
    setSources([...sources, { source: '', platform: '', keywords: [] }]);
  };




  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [sources]);
  const filteredKeywords = (formData[selectedPlatform] || []).filter(keyword =>
    keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get('http://5.180.148.40:9006/api/osint-man/v1/platforms',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        console.log(response.data.data)
        setPlatforms(response.data.data);
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    };

    fetchPlatforms();
  }, []);

  console.log('Current platforms state:', platforms)
  const handleSubmit = async () => {
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
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error("Error during case creation: " + (error.response?.data?.message || error.message));
    }
  };
        // try {
        //   const startResponse = await axios.post(`http://5.180.148.40:9002/api/start-task/${response.data.data.id}`, {
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        //   });
        //   window.dispatchEvent(new Event("databaseUpdated"));
        //   console.log('Start Task Response:', startResponse);
        //   console.log('Start Task ID:', startResponse.data.tasks);
        //   addTask(startResponse.data.tasks)
        //   if (startResponse.status === 200) {
        //     toast.success('Task started successfully');

        //     try {
        //       const updateStatusResponse = await axios.put(`http://5.180.148.40:8008/api/case-service/cases/${caseData1.id}`, { status: "Progress" }, {
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'Authorization': `Bearer ${token}`
        //         }
        //       });
        //       console.log('Update Status Response:', updateStatusResponse);
        //       if (updateStatusResponse.status === 200) {
        //         toast.success('Case status updated successfully');
        //       } else {
        //         toast.error('Unexpected response from server during status update.');
        //       }
        //     } catch (updateError) {
        //       console.error('Error updating status:', updateError);
        //       toast.error('Error during status update: ' + (updateError.response?.data?.message || updateError.message));
        //     }

        //   } else {
        //     toast.error('Unexpected response from server during task start.');
        //   }
        // } catch (startError) {
        //   console.error('Error starting task:', startError);
        //   toast.error('Error during task start: ' + (startError.response?.data?.message || startError.message));
        // }

  


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
           {platforms.map((platform,index) => (
               <option key={index} value={platform}>
               {platform}
             </option>
           ))}
         </select>
       </div>
      )}
 <div className="row">
 <div className="col-md-6">
 {selectedPlatform && (
        <div className="col-md-6">
          <label htmlFor={`${selectedPlatform}-keywords`} className="form-label source-label">
            {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} Keywords
          </label>
          <Dropdown className="w-100 keywords-dropdown" id={`${selectedPlatform}-keywords`}>
            <Dropdown.Toggle className="w-100 keywords-dropdown-toggle" variant="outline-secondary">
              Select
               {/* {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} Keywords */}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100 p-2 keywords-dropdown-menu" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              <div className="d-flex mb-2">
                <Form.Control
                  placeholder="Keyword"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="me-2"
                />
               
              </div>
              {filteredKeywords.map((keyword, index) => (
                <Badge key={index} pill bg="dark" className="me-2 mb-2" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minWidth: `${keyword.length * 6}px`, // Adjust width based on text length
                  maxWidth: '100%', // Prevent overflow
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                 
                }}>
                  {keyword} <Button size="sm" variant="dark" onClick={() => handleDeleteKeyword(index)}>x</Button>
                </Badge>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}

    </div>
          </div>
          </div>
        </div>
        <button type="button" className="btn btn-secondary add-new-filter-button" >
          Save and Add
        </button>
        <button type="button" className="btn btn-secondary add-new-filter-button" onClick={handleSubmit}>
        Proceed
        </button>
      </form>
      {/* <Summary filterId={filterId}/> */}
    </>
  );
};

export default AddNewFilter;
