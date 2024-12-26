import React, {  useState } from "react";
import "../../../Assets/Stlyes/createCase.css";
import axios from "axios";
import Cookies from "js-cookie"; // Make sure you're using this for cookies
import {  toast } from 'react-toastify';


const CreateCase = ({ togglePopup }) => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      assignee: "",
      watchers: '',
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    
    };
  console.log("set",setFormData)
    const handleCreateCase = async (formData) => {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("No token found in cookies.");
        return;
      }
      try {
         const authToken = Cookies.get('accessToken'); // Read the token from cookies
         const watchersArray = formData.watchers.split(',').map(watcher => watcher.trim());
         const response = await axios.post('http://5.180.148.40:8008/api/case-service/v1/cases',{
          title: formData.title,
           description: formData.description, 
           status: 'NEW',
           watchers: watchersArray
          
         }, {
         headers: { 'Content-Type': 'application/json',
           'Authorization': `Bearer ${authToken}` }
         }
        );
      
        console.log("Case Created:", response.data);
        toast("Case Created  Succesfully")
        togglePopup(); // Close the popup
     
      } catch (err) {
        toast("Error during case creation:", err.response || err)
        //console.error("Error during case creation:", err.response || err);
      }
      
    };
   
    return (
        <div className="popup-overlay">
      <div className="popup-container">
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
              value={formData.assignee}
              onChange={handleInputChange}
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
            />
            <div className="button-container">
              <button type="button" className="cancel-btn" onClick={togglePopup}>
                Cancel
              </button>
              <button type="submit" className="create-btn">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  };
 export default CreateCase;  