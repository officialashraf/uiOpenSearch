import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskFilter } from '../../../../Redux/Action/filterAction';
import Cookies from 'js-cookie';

const AddNewFilter = () => {
  const [sourceExpand, setSourceExpand] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [filterName, setFilterName] = useState('');
  const [taskId, setTaskId] = useState([]);
  const [filterId, setFilterId] = useState([]);
  const [sources, setSources] = useState([{ source: '', platform: [], keywords: [] }]);
  const containerRef = useRef(null);

  const dispatch = useDispatch();
  const caseData1 = useSelector((state) => state.caseData.caseData);
  const token = Cookies.get('accessToken');

  useEffect(() => {
    localStorage.setItem('taskId', taskId);
    localStorage.setItem('filterId', filterId);
    dispatch(setTaskFilter(taskId, filterId));
  }, [taskId, filterId, dispatch]);

  const handleSourceChange = (index, event) => {
    const value = event.target.value;
    const newSources = [...sources];
    newSources[index].source = value;
    setSources(newSources);
    if (value) {
      setSourceExpand(true);
    }
  };

  const handlePlatformChange = (index, event) => {
    const value = event.target.value;
    const newSources = [...sources];
    newSources[index].platform = value;
    setSources(newSources);
    setSelectedPlatform(value);
  };

  const handleAddKeyword = (index) => {
    if (newKeyword.trim()) {
      const newSources = [...sources];
      newSources[index].keywords.push(newKeyword.trim());
      setSources(newSources);
      setNewKeyword('');
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Enter') {
      handleAddKeyword(index);
      event.preventDefault();
    }
  };

  const handleDeleteKeyword = (index, keywordIndex) => {
    const newSources = [...sources];
    newSources[index].keywords.splice(keywordIndex, 1);
    setSources(newSources);
  };

  const handleAddSource = () => {
    setSources([...sources, { source: '', platform: [], keywords: [] }]);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [sources]);

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get('http://5.180.148.40:9006/api/osint-man/v1/platforms', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setPlatforms(response.data.data);
    } catch (error) {
      console.error('Error fetching platforms:', error);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const handleSubmit = async () => {
    const postData = {
      name: filterName,
      case_id: caseData1.id,
      data: sources.map((source) => ({
        source: source.source,
        platform: source.platform,
        keywords: source.keywords,
      })),
    };
   console.log("postData", postData)
    try {
      const response = await axios.post('http://5.180.148.40:9006/api/osint-man/v1/filter', postData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
      });

      if (response.status === 200) {
        toast.success(`Filter Created Successfully: ${response.data.data.name}`);
        setFilterId(response.data.data.id);
        setFilterName('');
        setSources([{ source: '', platform: [], keywords: [] }]);
        setSourceExpand(false);
         try {
                  const startResponse = await axios.post('http://5.180.148.40:9006/api/osint-man/v1/start/',
                     {
                      filter_id: filterId,
                      case_id: caseData1.id,
                      interval: 10
                    }, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    },
                  });
                  window.dispatchEvent(new Event("databaseUpdated"));
                  console.log('Start Task Response:', startResponse);
                  console.log('Start Task ID:', startResponse.data.tasks);
                  // addTask(startResponse.data.tasks)

                  
                  if (startResponse.status === 200) {
                    toast.success('Task started successfully');
        
                    try {
                      const updateStatusResponse = await axios.put(` http://5.180.148.40:9001/api/case-man/v1/case/${caseData1.id}`, { status: " In Progress" }, {
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
                      toast.error('Error during status update: ' + (updateError.response?.data?.detail || updateError.message));
                    }
        
                  } else {
                    toast.error('Unexpected response from server during task start.');
                  }
                } catch (startError) {
                  console.error('Error starting task:', startError);
                  toast.error('Error during task start: ' + (startError.response?.data?.detail|| startError.message));
                }

      } else {
        toast.error('Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error((error.response?.data?.detail || error.message || 'Error during filter creation:'));
    }
  };

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="filterName" className="form-label">
            Filter Name
          </label>
          <input
            type="text"
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

        <div
          className="container-fluid mb-3 source-container-parent"
          ref={containerRef}
          style={{ maxHeight: '300px', overflowY: 'auto', marginTop:'5px' }}
        >
          {sources.map((source, index) => (
            <div
              key={index}
              className={'container-fluid mb-3 source-container ' + (sourceExpand ? 'source-container-expanded' : 'source-container-collapsed')}
            >
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor={`source-${index}`} className="form-label source-label">
                    Source
                  </label>
                  <select
                    placeholder="Select"
                    onChange={(e) => handleSourceChange(index, e)}
                    className="form-select source-select"
                    id={`source-${index}`}
                    value={source.source}
                  >
                    <option value="" disabled>
                      Select Source
                    </option>
                    <option value="Social Media">Social Media</option>
                    <option value="Social Media Profile">Social Media Profile</option>
                    <option value="Rss">Rss</option>
                  </select>
                </div>
                {sourceExpand && (
                  <div className="col-md-6">
                    <label htmlFor={`platform-${index}`} className="form-label source-label">
                      Platform
                    </label>
                    <select
                      className="form-select source-select"
                      id={`platform-${index}`}
                      onChange={(e) => handlePlatformChange(index, e)}
                      value={source.platform}
                    >
                      <option value="" disabled>
                        Select Platform
                      </option>
                      {platforms.map((platform, idx) => (
                        <option key={idx} value={platform}>
                          {platform}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              {source.platform && (
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor={`${source.platform}-keywords-${index}`} className="form-label source-label">
                      {source.platform
                    //   .charAt(0).toUpperCase() + source.platform.slice(1)
                    } Keywords
                    </label>
                    <Dropdown className="w-100 keywords-dropdown" id={`${source.platform}-keywords-${index}`}>
                      <Dropdown.Toggle className="w-100 keywords-dropdown-toggle" variant="outline-secondary">
                        Select
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
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="me-2"
                          />
                        </div>
                        {source.keywords.map((keyword, keywordIndex) => (
                          <Badge
                            key={keywordIndex}
                            pill
                            bg="dark"
                            className="me-2 mb-2"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              minWidth: `${keyword.length * 6}px`,
                              maxWidth: '100%',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {keyword}
                            <Button size="sm" variant="dark" onClick={() => handleDeleteKeyword(index, keywordIndex)}>
                              x
                            </Button>
                          </Badge>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button type="button" className="btn btn-secondary add-new-filter-button" onClick={handleAddSource}>
          Add New Source
        </button>
        <button type="button" className="btn btn-primary add-new-filter-button" onClick={handleSubmit}>
          Proceed
        </button>
      </form>
    </>
  );
};

export default AddNewFilter;