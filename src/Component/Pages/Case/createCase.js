import React, {  useState } from "react";
import "../../../Assets/Stlyes/createCase.css";
import axios from "axios";
import Cookies from "js-cookie"; // Make sure you're using this for cookies
import {  toast } from 'react-toastify';


const CreateCase = ({ togglePopup }) => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
       status: 'NEW',
       watchers: '',
      
      
    });
   // if (Array.isArray(formData.watchers)) { formData.watchers = formData.watchers.join(', '); }
    console.log('Form Data:', formData);
console.log('Watchers:', formData.watchers.split(',').map(watcher => watcher.trim()));

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    
    };
  //console.log("set",setFormData)
  const handleCreateCase = async (formData) => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("Authentication error: No token found");
      return;
    }
    try {
      const response = await axios.post('http://5.180.148.40:8008/api/case-service/v1/cases', {
        title: formData.title,
        description: formData.description,
        status: 'Progress',
        watchers:formData.watchers.split(',').map(watcher => watcher.trim()).join(', '),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        toast.success("Case Created Successfully");
        togglePopup(); // पॉपअप बंद करें
      } else {
        toast.error("Unexpected response from server.");
      }
  
    } catch (err) {
      console.error("Error during case creation:", err.response || err);
      toast.error("Error during case creation: " + (err.response?.data?.message || err.message));
    }
  };
   
    return (
        <div className="popup-overlay">
      <div className="popup-container">
      <button className="close-icon" onClick={togglePopup}>
          &times;
        </button>
        <div className="popup-content">
          <h2>Create Case</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateCase(formData);
            }}
          >
            <label htmlFor="title">Title:</label>
            <input
             className="com"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter title"
              required
            />
            <label htmlFor="description">Description:</label>
            <textarea
             className="com"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
            ></textarea>
            <label htmlFor="assignee">Assignee:</label>
            <select
              id="assignee"
              name="assignee"
              className="com"
             // value={formData.assignee}
              //onChange={handleInputChange}
            >
              <option value="">Select Assignee</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </select>
            <label htmlFor="watcher">Watcher:</label>
            <input
              type="text"
              id="watcher"
              name="watchers"
              value={formData.watchers}
              onChange={handleInputChange}
              placeholder="Search watcher"
                autoComplete="off"
               className="com"
            
            />
            <div className="button-container">
              <button type="submit" className="create-btn">
                Create
              </button>
              <button type="button" className="cancel-btn" onClick={togglePopup}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  };
 export default CreateCase;  