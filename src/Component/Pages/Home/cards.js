import React from 'react';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import { Folder, FileEarmarkPlus, PieChart, Check2Circle, PauseCircle, Archive, Trash } from 'react-bootstrap-icons';
import '../../../Assets/Stlyes/card.css';
import { useEffect, useState,useCallback } from 'react';
import Cookies from "js-cookie";

  const cardTemplate = [
    { icon: <Folder size={15} />, name: 'All Files', key: 'case_count' },
    { icon: <FileEarmarkPlus size={15} />, name: 'New Files', key: 'new' },
    { icon: <PieChart size={15} />, name: 'In Progress', key: 'in progress' },
    { icon: <Check2Circle size={15} />, name: 'Closed', key: 'closed' },
    { icon: <PauseCircle size={15} />, name: 'On Hold', key: 'on hold' },
    { icon: <Archive size={15} />, name: 'Archived', key: 'archived' },
    { icon: <Trash size={15} />, name: 'Deleted', key: 'deleted' },
  ];

const StatusCard = ({ name, number, icon })=> {
  return (
    <Card className="card-container">
      <Card.Body className="card-body">
        {/* Icon Section */}
        <div className="logo-icon">
          {icon}
        </div>

        {/* Text Section */}
        <div className="text-section">
          <div className="card-name">{name}</div>
          <div className="card-number">{number}</div>
        </div>
      </Card.Body>
    </Card>
  );
}

const CardList = ()=> {
  const [cardData, setCardData] = useState(cardTemplate);
  const [refresh, setRefresh] = useState(true);
   const Token = Cookies.get('accessToken');
  const getCardData = async () => {
    try {
      const response = await axios.get('http://5.180.148.40:8008/api/case-service/cases/states-count',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`
        },
      });
      const apiData = response.data;
       
      const updatedData = cardTemplate.map(item => ({
        ...item,
        number: apiData[item.key] || 0
      }));
      setCardData(updatedData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const carListData = useCallback(() => {
    getCardData()
}, [cardData]);
useEffect(() => {
  if (refresh) {
    carListData(); // Runs only when refresh changes
      setRefresh(false); // Reset refresh state after running
  }
}, [refresh]);
  return (
    <Container fluid className="card-list-container">
      {cardData.map((item, index) => (
        <StatusCard key={index} name={item.name}  number={item.number} icon={item.icon} />
      ))}
    </Container>
  );
}

export default CardList;
