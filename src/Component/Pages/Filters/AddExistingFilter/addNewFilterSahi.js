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
      keywords: [],
      url: []  // Changed from urls to url
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

  const handleSourceChange = (index, event) => {
    const value = event.target.value;
    const newSources = [...sources];
    newSources[index].source = value;
    newSources[index].platform = [];
    newSources[index].url = [];
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
      newSources[index].url.push(sources[index].urlInput.trim());
      newSources[index].urlInput = '';
      setSources(newSources);
      event.preventDefault();
    }
  };

  const handleDeleteKeyword = (sourceIndex, keywordIndex) => {
    const newSources = [...sources];
    newSources[sourceIndex].keywords.splice(keywordIndex, 1);
    setSources(newSources);
  };

  const handleDeleteUrl = (sourceIndex, urlIndex) => {
    const newSources = [...sources];
    newSources[sourceIndex].url.splice(urlIndex, 1);
    setSources(newSources);
  };

  const handleAddSource = () => {
    setSources([...sources, { 
      source: '', 
      platform: [],
      keywords: [],
      keywordInput: '',
      url: [],
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
      description,
      filter_criteria: sources.map((source) => {
        if (source.source === 'rss feed') {
          return {
            source: source.source,
            urls: source.url,  // Ensure urls is an array
            keywords: source.keywords
          };
        } else {
          return {
            source: source.source,
            platform: source.platform,
            keywords: source.keywords
          };
        }
      })
    };
    console.log("postData", postData);
    try {
      const response = await axios.post(
        'http://5.180.148.40:9006/api/osint-man/v1/filter',
        postData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success(`Filter Created: ${response.data.data.name}`);
        const newFilterId = response.data.data.id;
        setFilterId((prev) => [...prev, newFilterId]);

        const startPayload = {
          filter_id: [newFilterId],
          case_id: caseData1.id.toString(),
          interval: 10,
        };
        
        await axios.post(
          'http://5.180.148.40:9006/api/osint-man/v1/start',
          startPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        await axios.put(
          `http://5.180.148.40:9001/api/case-man/v1/case/${caseData1.id}`,
          { status: "in progress" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setFilterName('');
        setDescription('');
        setSources([{ source: '', platform: [], keywords: [], url: [] }]);  // Reset sources
        window.dispatchEvent(new Event("databaseUpdated"));
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Error: ' + (error.response?.data?.detail || error.message));
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

        <div ref={containerRef} style={{height:'300px', overflow:'auto'}}>
          {sources.map((source, sourceIndex) => (
            <div key={sourceIndex} className="mb-3 p-3 border rounded">
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
                      value={source.platform}
                      onChange={(e) => {
                        const newSources = [...sources];
                        newSources[sourceIndex].platform = [e.target.value];
                        setSources(newSources);
                      }}
                    >
                      <option value="">Select Platform</option>
                      {Array.isArray(platform) && platform.map((plat, idx) => (
                        <option key={idx} value={plat}>
                          {plat}
                        </option>
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
                          className="me-2 mb-2 d-inline-flex align-items-center"
                        >
                          {keyword}
                          <Button
                            variant="link"
                            className="text-light p-0 ms-2"
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
                      {source.url.map((url, urlIndex) => (
                        <Badge
                          key={urlIndex}
                          pill
                          bg="dark"
                          className="me-2 mb-2 d-inline-flex align-items-center"
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
            <button type="button" className="btn btn-secondary add-new-filter-button" onClick={handleAddSource}>
              Add New Source
            </button>
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
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { Form, InputGroup, Button, Badge } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import { setTaskFilter } from '../../../../Redux/Action/filterAction';
// import Cookies from 'js-cookie';

// const AddNewFilter = () => {
//   const [platform, setPlatform] = useState([]);
//   const [newKeyword, setNewKeyword] = useState('');
//   const [filterName, setFilterName] = useState('');
//   const [description, setDescription] = useState('');
//   const [taskId, setTaskId] = useState([]);
//   const [filterId, setFilterId] = useState([]);
//   const [sources, setSources] = useState([
//     { 
//       source: '', 
//       platform: [],
//       keywords: [],
//       url: []  // Changed from urls to url
//     },
//   ]);
//   const containerRef = useRef(null);

//   const dispatch = useDispatch();
//   const caseData1 = useSelector((state) => state.caseData.caseData);
//   const token = Cookies.get('accessToken');

//   useEffect(() => {
//     localStorage.setItem('taskId', taskId);
//     localStorage.setItem('filterId', filterId);
//     dispatch(setTaskFilter(taskId, filterId));
//   }, [taskId, filterId, dispatch]);

//   const handleSourceChange = (index, event) => {
//     const value = event.target.value;
//     const newSources = [...sources];
//     newSources[index].source = value;
//     newSources[index].platform = [];
//     newSources[index].url = [];
//     setSources(newSources);
//   };

//   const handleKeywordChange = (index, value) => {
//     const newSources = [...sources];
//     newSources[index].keywordInput = value;
//     setSources(newSources);
//   };

//   const handleKeywordKeyDown = (index, event) => {
//     if (event.key === 'Enter' && sources[index].keywordInput.trim()) {
//       const newSources = [...sources];
//       newSources[index].keywords.push(sources[index].keywordInput.trim());
//       newSources[index].keywordInput = '';
//       setSources(newSources);
//       event.preventDefault();
//     }
//   };

//   const handleUrlKeyDown = (index, event) => {
//     if (event.key === 'Enter' && sources[index].urlInput.trim()) {
//       const newSources = [...sources];
//       newSources[index].url.push(sources[index].urlInput.trim());
//       newSources[index].urlInput = '';
//       setSources(newSources);
//       event.preventDefault();
//     }
//   };

//   const handleDeleteKeyword = (sourceIndex, keywordIndex) => {
//     const newSources = [...sources];
//     newSources[sourceIndex].keywords.splice(keywordIndex, 1);
//     setSources(newSources);
//   };

//   const handleDeleteUrl = (sourceIndex, urlIndex) => {
//     const newSources = [...sources];
//     newSources[sourceIndex].url.splice(urlIndex, 1);
//     setSources(newSources);
//   };

//   const handleAddSource = () => {
//     setSources([...sources, { 
//       source: '', 
//       platform: [],
//       keywords: [],
//       keywordInput: '',
//       url: [],
//       urlInput: ''
//     }]);
//   };

//   const fetchPlatforms = async () => {
//     try {
//       const response = await axios.get('http://5.180.148.40:9006/api/osint-man/v1/platforms', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setPlatform(response.data.data || []);
//     } catch (error) {
//       console.error('Platform fetch error:', error);
//       toast.error('Error fetching platforms: ' + (error.response?.data?.detail || error.message));
//     }
//   };

//   useEffect(() => {
//     fetchPlatforms();
//   }, []);

//   const handleSubmit = async () => {
//     const postData = {
//       name: filterName,
//       description,
//       filter_criteria: sources.map((source) => {
//         if (source.source === 'rss feed') {
//           return {
//             source: source.source,
//             urls: source.url,  // Changed from urls to url
//             keywords: source.keywords
//           };
//         } else {
//           return {
//             source: source.source,
//             platform: source.platform,
//             keywords: source.keywords
//           };
//         }
//       })
//     };
//     console.log("postData", postData);
//     try {
//       const response = await axios.post(
//         'http://5.180.148.40:9006/api/osint-man/v1/filter',
//         postData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.status === 200) {
//         toast.success(`Filter Created: ${response.data.data.name}`);
//         const newFilterId = response.data.data.id;
//         setFilterId((prev) => [...prev, newFilterId]);

//         const startPayload = {
//           filter_id: [newFilterId],
//           case_id: caseData1.id.toString(),
//           interval: 10,
//         };
        
//         await axios.post(
//           'http://5.180.148.40:9006/api/osint-man/v1/start',
//           startPayload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         await axios.put(
//           `http://5.180.148.40:9001/api/case-man/v1/case/${caseData1.id}`,
//           { status: "in progress" },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setFilterName('');
//         setDescription('');
//         setSources([{ source: '', platform: [], keywords: [], url: [] }]);  // Changed from urls to url
//         window.dispatchEvent(new Event("databaseUpdated"));
//       }
//     } catch (error) {
//       console.error('Submit error:', error);
//       toast.error('Error: ' + (error.response?.data?.detail || error.message));
//     }
//   };

//   return (
//     <div className="p-3">
//       <Form>
//         <Form.Group className="mb-3">
//           <Form.Label>Filter Name</Form.Label>
//           <Form.Control
//             type="text"
//             value={filterName}
//             onChange={(e) => setFilterName(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </Form.Group>

//         <div ref={containerRef} style={{height:'300px', overflow:"auto"}}>
//           {sources.map((source, sourceIndex) => (
//             <div key={sourceIndex} className="mb-3 p-3 border rounded">
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <Form.Label>Source</Form.Label>
//                   <Form.Select
//                     value={source.source}
//                     onChange={(e) => handleSourceChange(sourceIndex, e)}
//                   >
//                     <option value="">Select Source</option>
//                     <option value="social media">Social Media</option>
//                     <option value="social media profile">Social Media Profile</option>
//                     <option value="rss feed">RSS Feed</option>
//                   </Form.Select>
//                 </div>

//                 {source.source && source.source !== 'rss feed' && (
//                   <div className="col-md-6">
//                     <Form.Label>Platform</Form.Label>
//                     <Form.Select
//                       value={source.platform}
//                       onChange={(e) => {
//                         const newSources = [...sources];
//                         newSources[sourceIndex].platform = [e.target.value];
//                         setSources(newSources);
//                       }}
//                     >
//                       <option value="">Select Platform</option>
//                       {Array.isArray(platform) && platform.map((plat, idx) => (
//                         <option key={idx} value={plat}>
//                           {plat}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </div>
//                 )}

//                 {source.source && (
//                   <div className="col-12">
//                     <Form.Label>Keywords</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter keyword and press Enter"
//                       value={source.keywordInput}
//                       onChange={(e) => handleKeywordChange(sourceIndex, e.target.value)}
//                       onKeyDown={(e) => handleKeywordKeyDown(sourceIndex, e)}
//                     />
//                     <div className="mt-2">
//                       {source.keywords.map((keyword, keyIndex) => (
//                         <Badge
//                           key={keyIndex}
//                           pill
//                           bg="dark"
//                           className="me-2 mb-2 d-inline-flex align-items-center"
//                         >
//                           {keyword}
//                           <Button
//                             variant="link"
//                             className="text-light p-0 ms-2"
//                             onClick={() => handleDeleteKeyword(sourceIndex, keyIndex)}
//                           >
//                             ×
//                           </Button>
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {source.source === 'rss feed' && (
//                   <div className="col-12">
//                     <Form.Label>RSS URL</Form.Label>
//                     <Form.Control
//                       type="url"
//                       placeholder="Enter RSS URL and press Enter"
//                       value={source.urlInput}
//                       onChange={(e) => {
//                         const newSources = [...sources];
//                         newSources[sourceIndex].urlInput = e.target.value;
//                         setSources(newSources);
//                       }}
//                       onKeyDown={(e) => handleUrlKeyDown(sourceIndex, e)}
//                     />
//                     <div className="mt-2">
//                       {source.url.map((url, urlIndex) => (
//                         <Badge
//                           key={urlIndex}
//                           pill
//                           bg="dark"
//                           className="me-2 mb-2 d-inline-flex align-items-center"
//                         >
//                           {url}
//                           <Button
//                             variant="link"
//                             className="text-light p-0 ms-2"
//                             onClick={() => handleDeleteUrl(sourceIndex, urlIndex)}
//                           >
//                             ×
//                           </Button>
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//           <div style={{ position: 'fixed', marginBottom: "5px", bottom: "50px", right: '40px', zIndex: '1000' }}>
//             <button type="button" className="btn btn-secondary add-new-filter-button" onClick={handleAddSource}>
//               Add New Source
//             </button>
//             <button type="button" className="btn btn-primary add-new-filter-button" style={{ marginLeft: '5px' }} onClick={handleSubmit}>
//               Proceed
//             </button>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default AddNewFilter;