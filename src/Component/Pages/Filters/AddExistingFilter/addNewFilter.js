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
  const [description, setDescription] = useState(''); // Added state for description
  const [taskId, setTaskId] = useState([]);
  const [filterId, setFilterId] = useState('');
  const [sources, setSources] = useState([
    { source: '', platform: [], keywords: [], url: '' },
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
    newSources[index].platform = value.split(',').map((p) => p.trim());
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
    setSources([...sources, { source: '', platform: [], keywords: [], url: '' }]);
  };

  const handleUrlChange = (index, event) => {
    const newSources = [...sources];
    newSources[index].url = event.target.value;
    setSources(newSources);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
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
      window.dispatchEvent(new Event("databaseUpdated"));
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
      description: description, // Added description to postData
      filter_criteria: sources.map((source) => ({
        source: source.source,
        platform: source.platform,
        keywords: source.keywords,
        url: source.source === 'Rss' ? source.url : undefined,
      })),
    };
    console.log("postData", postData);
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
        setDescription(''); // Clear description after submission
        setSources([{ source: '', platform: [], keywords: [], url: '' }]);
        setSourceExpand(false);
      } else {
        toast.error('Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error('Error during filter creation: ' + (error.response?.data?.detail || error.message));
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
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>

        <div
          className="container-fluid mb-3 source-container-parent"
          ref={containerRef}
          style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '5px' }}
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
                      value={source.platform.join(',')}
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
              {source.platform.length > 0 && (
  <div className="row">
    <div className="col-md-12">
      <label htmlFor={`${source.platform}-keywords-${index}`} className="form-label source-label">
        {source.platform} Keywords
      </label>
      <Dropdown className="w-100 keywords-dropdown" id={`${source.platform}-keywords-${index}`}>
        <Dropdown.Toggle className="w-100 keywords-dropdown-toggle" variant="outline-secondary">
          Select
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100 p-2 keywords-dropdown-menu" style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
              {source.source === 'Rss' && (
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor={`rss-url-${index}`} className="form-label source-label">
                      RSS URL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`rss-url-${index}`}
                      value={source.url}
                      onChange={(e) => handleUrlChange(index, e)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
                  <div style={{ position: 'fixed',marginBottom:"5px", bottom:"50px", right: '40px', zIndex: '1000' }}>
  <button type="button" className="btn btn-secondary add-new-filter-button" onClick={handleAddSource}>
    Add New Source
  </button>
  <button type="button" className="btn btn-primary add-new-filter-button" style={{ marginLeft: '5px' }} onClick={handleSubmit}>
    Proceed
  </button>
</div>
        </div>

      </form>

      
    </>
  );
};

export default AddNewFilter;