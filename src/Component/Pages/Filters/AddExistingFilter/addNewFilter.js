
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskFilter } from '../../../../Redux/Action/filterAction';
import Cookies from 'js-cookie';

const AddNewFilter = () => {
  const [platform, setPlatform] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [filterName, setFilterName] = useState('');
  const [description, setDescription] = useState('');
  const [taskId, setTaskId] = useState([]);
  const [filterId, setFilterId] = useState([]);
  const [sources, setSources] = useState([
    { 
      source: '', 
      platform: [],
      keywords: [], // Initialize as an array with a single empty string
      urls: [] // Initialize as an array with a single empty string
    },
  ]);
  const containerRef = useRef(null);

  const dispatch = useDispatch();
  const caseData1 = useSelector((state) => state.caseData.caseData);
  const token = Cookies.get('accessToken');

  useEffect(() => {
    localStorage.setItem('taskId', taskId);
    localStorage.setItem('filterId', filterId);
    dispatch(setTaskFilter(taskId, filterId));
  }, [taskId, filterId, dispatch]);

  const handlePlatformChange = (sourceIndex, event) => {
    const selected = Array.from(event.target.selectedOptions, opt => opt.value);
    const newSources = [...sources];
    newSources[sourceIndex].platform = selected;
    setSources(newSources);
  };
  const handleSourceChange = (index, event) => {
    const value = event.target.value;
    const newSources = [...sources];
    newSources[index].source = value;
    newSources[index].platform = [];
    newSources[index].urls = [''];
    setSources(newSources);
  };

  const handleKeywordChange = (index, value) => {
    const newSources = [...sources];
    newSources[index].keywordInput = value;
    setSources(newSources);
  };

  const handleKeywordKeyDown = (index, event) => {
    if (event.key === 'Enter' && sources[index].keywordInput.trim()) {
      const newSources = [...sources];
      newSources[index].keywords.push(sources[index].keywordInput.trim());
      newSources[index].keywordInput = '';
      setSources(newSources);
      event.preventDefault();
    }
  };

  const handleUrlKeyDown = (index, event) => {
    if (event.key === 'Enter' && sources[index].urlInput.trim()) {
      const newSources = [...sources];
      newSources[index].urls.push(sources[index].urlInput.trim());
      newSources[index].urlInput = '';
      setSources(newSources);
      event.preventDefault();
    }
  };

  const handleDeleteKeyword = (sourceIndex, keyIndex) => {
    const newSources = [...sources];
    newSources[sourceIndex].keywords = newSources[sourceIndex].keywords.filter((_, i) => i !== keyIndex);
    setSources(newSources);
  };

  const handleDeleteUrl = (sourceIndex, urlIndex) => {
    const newSources = [...sources];
    newSources[sourceIndex].urls = newSources[sourceIndex].urls.filter((_, i) => i !== urlIndex);
    setSources(newSources);
  };

  const handleAddSource = () => {
    setSources([...sources, { 
      source: '', 
      platform: [],
      keywords: [],
      urls: [],
      keywordInput: '',
      urlInput: ''
    }]);
  };


  const fetchPlatforms = async () => {
    try {
      const response = await axios.get('http://5.180.148.40:9006/api/osint-man/v1/platforms', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlatform(response.data.data || []);
    } catch (error) {
      console.error('Platform fetch error:', error);
      toast.error('Error fetching platforms: ' + (error.response?.data?.detail || error.message));
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const handleSubmit = async () => {
    const postData = {
      name: filterName,
      description: description, // Ensure description is included
      filter_criteria: sources.map((source) => ({
        source: source.source,
        platform: source.platform,
        keywords: source.keywords,
        urls: source.source === 'rss feed' ? [source.urls.join(',')] : undefined,
      })),
    };
  
    console.log("postData", postData);
  
    try {
      // Step 1: Create the filter
      const response = await axios.post(
        'http://5.180.148.40:9006/api/osint-man/v1/filter',
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        toast.success(`Filter Created Successfully: ${response.data.data.name}`);
        
        const newFilterId = Number(response.data.data.id); // Ensure it's a number
        setFilterId((prevFilterIds) => [...prevFilterIds, newFilterId]);
  
        console.log("Filter ID:", newFilterId, "Type:", typeof newFilterId);
  
        // Step 2: Start the task using new filter ID
        try {
          const startPayload = {
            filter_id: [newFilterId],  // Ensure it's an array of integers
            case_id: String(caseData1.id), // Ensure it's a string
            interval: 10,
          };
  
          console.log("startPayload", startPayload);
  
          const startResponse = await axios.post(
            'http://5.180.148.40:9006/api/osint-man/v1/start',
            startPayload,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            }
          );
          console.log('Start Task Response:', startResponse);
          window.dispatchEvent(new Event("databaseUpdated"));
        
  
          if (startResponse.status === 200) {
            console.log("Task started successfully")
            // toast.success('Task started successfully');
  
            // Step 3: Update case status
            try {
              const updateStatusResponse = await axios.put(
                `http://5.180.148.40:9001/api/case-man/v1/case/${caseData1.id}`,
                { status: "in progress" },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                }
              );
  
              // console.log('Update Status Response:', updateStatusResponse);
  
              if (updateStatusResponse.status === 200) {
              console.log('Case status updated successfully')
                // toast.success('Case status updated successfully');

              } else {
                toast.error('Unexpected response from server during status update.');
              }
            } catch (updateError) {
              console.error('Error updating status:', updateError);
              toast.error('Error during status update: ' + (updateError.response?.data?.detail || updateError.message));
            }
          } else {
            toast.error('Unexpected response from server during task start.');
          }
        } catch (startError) {
          console.error('Error starting task:', startError);
          toast.error('Error during task start: ' + (startError.response?.data?.detail || startError.message));
        }
  
        // Reset form fields after successful submission
        setFilterName('');
        setDescription('');
        setSources([{ source: '', platform: [], keywords: [], urls: [] }]);
      } else {
        toast.error('Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error('Error during filter creation: ' + (error.response?.data?.detail || error.message));
    }
  };
  
  return (
    <div className="p-3">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Filter Name</Form.Label>
          <Form.Control
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            // autoComplete='on'
            // style={{
            //   transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
            //   boxSizing: 'border-box',
            //   padding: '10px',
            //   width: '100%',
            //   border: '1px solid #ccc',
            //   backgroundColor: '#fff',
            //   position: 'relative', /* To prevent layout shifting */
            // }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <div ref={containerRef} style={{ height: '300px', overflowY: 'auto',overflowX:'hidden' }}>
          {sources.map((source, sourceIndex) => (
           
            <div key={sourceIndex} className="mb-3 p-1 border rounded">
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    value={source.source}
                    onChange={(e) => handleSourceChange(sourceIndex, e)}
                  >
                    <option value="">Select Source</option>
                    <option value="social media">Social Media</option>
                    <option value="social media profile">Social Media Profile</option>
                    <option value="rss feed">RSS Feed</option>
                  </Form.Select>
                </div>

                {source.source && source.source !== 'rss feed' && (
                  <div className="col-md-6">
                    <Form.Label>Platform</Form.Label>
                    <Form.Select
                      // multiple
                      value={source.platform}
                      onChange={(e) => handlePlatformChange(sourceIndex, e)}
                    >
                      {platform.map((plat) => (
                        <option key={plat} value={plat}>{plat}</option>
                      ))}
                    </Form.Select>
                  </div>
                )}

                {source.source && (
                  <div className="col-12">
                    <Form.Label>Keywords</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter keyword and press Enter"
                      value={source.keywordInput}
                      onChange={(e) => handleKeywordChange(sourceIndex, e.target.value)}
                      onKeyDown={(e) => handleKeywordKeyDown(sourceIndex, e)}
                    />
                    <div className="mt-2">
                      {source.keywords.map((keyword, keyIndex) => (
                        <Badge
                          key={keyIndex}
                          pill
                          bg="dark"
                          className="me-2 mb-1 d-inline-flex align-items-center"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            minWidth: `${keyword.length * 10}px`,
                            maxWidth: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {keyword}
                          <Button
                            variant="link"
                            className="text-light p-0 ms-1"
                            onClick={() => handleDeleteKeyword(sourceIndex, keyIndex)}
                          >
                            ×
                          </Button>
                        </Badge>
                        
                      ))}
                 
                    </div>
             
            
                  </div>
                )}

                {source.source === 'rss feed' && (
                  <div className="col-12">
                    <Form.Label>RSS URL</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Enter RSS URL and press Enter"
                      value={source.urlInput}
                      onChange={(e) => {
                        const newSources = [...sources];
                        newSources[sourceIndex].urlInput = e.target.value;
                        setSources(newSources);
                      }}
                      onKeyDown={(e) => handleUrlKeyDown(sourceIndex, e)}
                    />
                    <div className="mt-2">
                      {source.urls.map((url, urlIndex) => (
                        <Badge
                          key={urlIndex}
                          pill
                          bg="dark"
                          className="me-2 mb-2 d-inline-flex align-items-center"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            minWidth: `${url.length * 10}px`,
                            maxWidth: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {url}
                          <Button
                            variant="link"
                            className="text-light p-0 ms-2"
                            onClick={() => handleDeleteUrl(sourceIndex, urlIndex)}
                          >
                            ×
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                )}
             
              </div>
            
            </div>
           
       
          
          ))}
        
          
          <div style={{ position: 'fixed', marginBottom: "5px", bottom: "50px", right: '40px', zIndex: '1000' }}>
          <button type="button" className="btn btn-secondary add-new-filter-button"  onClick={handleAddSource}>
              Add Source
            </button>
            {/* <button type="button" className="btn btn-secondary add-new-filter-button" style={{ marginLeft: '5px' }} onClick={handleAddSource}>
            Save Filter
            </button> */}
            <button type="button" className="btn btn-primary add-new-filter-button" style={{ marginLeft: '5px' }} onClick={handleSubmit}>
              Proceed
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddNewFilter;