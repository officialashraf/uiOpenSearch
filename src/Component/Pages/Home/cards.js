import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Folder, FileEarmarkPlus,PieChartFill, Check2Circle, PauseCircle,ArchiveFill, Trash } from 'react-bootstrap-icons';
import '../../../Assets/Stlyes/card.css';

const data = [
  { name: 'All Files', number: 25, icon: <Folder className="logo-icon" /> },
  { name: 'New Files', number: 10, icon: <FileEarmarkPlus className="logo-icon" /> },
  { name: 'In Progress', number: 5, icon: <PieChartFill className="logo-icon" /> },
  { name: 'Closed', number: 8, icon: <Check2Circle className="logo-icon" /> },
  { name: 'On Hold', number: 3, icon: <PauseCircle className="logo-icon" /> },
  { name: 'Archived', number: 12, icon: <ArchiveFill className="logo-icon" />},
  { name: 'Deleted', number: 7, icon: <Trash className="logo-icon" /> },
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
  return (
    <Container fluid className="card-list-container">
      {data.map((item, index) => (
        <StatusCard key={index} name={item.name} number={item.number} icon={item.icon} />
      ))}
    </Container>
  );
}

export default CardList;
