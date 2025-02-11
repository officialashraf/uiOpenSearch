import React, { useState, useEffect } from "react";
import "../../../Assets/Stlyes/createCase.css";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import Select from 'react-select';

const EditCase = ({ togglePopup, item }) => {
  const [formData, setFormData] = useState({
    title: item.title || "",
    description: item.description || "",
    // status: item.status || '',
    watchers: item.watchers.join(", ") || [],
    assignee: item.assignee || '',
  });
console.log("item.id", item)
 const [users, setUsers] = useState([]);
 const options = users.data && users.data.map(user => ({
  value: user.id,
  label: user.username
}));
 const userData = async () => {
  const token = Cookies.get("accessToken");
   try { 
    const response = await axios.get('http://5.180.148.40:9000/api/user-man/v1/user'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
     const user = response.data;
      setUsers(user); // Update the state with usered data
       } catch (error) { 
        console.error('There was an error usering the data!', error); 
      } };
    useEffect(() => {
    userData(); // Call the userData function
    }, []);  

  const handleEditCase = async (formData) => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("Authentication error: No token found");
      return;
    }
    try {
      const updateData = {
    
          title: formData.title,
          description: formData.description,
          // status: formData.status,
          assignee: formData.assignee,
          watchers: formData.watchers.split(", "),
    
      }
      const response = await axios.put(`http://5.180.148.40:9001/api/case-man/v1/case/${item.id}`,updateData ,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("updated aDate", updateData)
      window.dispatchEvent(new Event("databaseUpdated"));
      if (response.status === 200) {
        toast.success("Case Edited Successfully");
        togglePopup();
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Error during case editing:", err.response || err);
      toast.error("Error during case editing: " + (err.response?.data?.detail || err.message));
    }
  };
  console.log("Options:", options);
  console.log("formData.assignee:", formData.assignee);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleWatchersChange = (selectedOptions) => {
    const selectedLabels = selectedOptions.map((option) => option.label).join(", ");
    setFormData((formData) => ({
      ...formData,
      watchers: selectedLabels,
    }));
  };

  const handleAssigneeChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      assignee:  selectedOption.value
      
      //selectedOption ?  parseInt(selectedOption.value, 10) : ''
    }));
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'white',
      color: 'black',
      boxShadow: 'none',
      outline: 'none'
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'white',
      color: 'black',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? 'black' : 'white',
      color: 'black',
      '&:hover': {
        backgroundColor: 'black',
        color: 'white'
      }
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'white',
      color: 'black',
    }),
    multiValueLabel: (base) => ({
      ...base,
      backgroundColor: 'black',
      color: 'white',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'black',
      '&:hover': {
        backgroundColor: 'black',
        color: 'white'
      }
    })
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-icon" onClick={togglePopup}>
          &times;
        </button>
        <div className="popup-content">
          <h5>Edit Case</h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditCase(formData);
            }}
          >
            <label htmlFor="title">Title:</label>
            <input
              className="com"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
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
            <div>
              <label htmlFor="assignee">Assignee:</label>
              <Select
            options={options}
            name="assignee"
            styles={customStyles}
            className="com"
            placeholder="Select Assignee"
           // defaultValue={options && options.find((option) => option.label )}
           defaultValue={options && options.find((option) => option.label   ) || null}
            onChange={handleAssigneeChange}
          />
              
            </div>
            <label htmlFor="watchers">Watchers:</label>
            <Select
              options={options}
              isMulti
              styles={customStyles}
              className="com"
              name="watchers"
              placeholder="Select Watchers"
              value={options && options.filter((option) => formData.watchers.split(", ").includes(option.label))}
              onChange={handleWatchersChange}
            />
            <div className="button-container">
              <button type="submit" className="create-btn">
               Update
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

export default EditCase;
