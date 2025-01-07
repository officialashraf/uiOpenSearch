import React from 'react';
import { Card, Container } from 'react-bootstrap';

import '../../../Assets/Stlyes/card.css';



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

const CardList = ({data })=> {
  return (
    <Container fluid className="card-list-container">
      {data.map((item, index) => (
        <StatusCard key={index} name={item.name}  number={item.number} icon={item.icon} />
      ))}
    </Container>
  );
}

export default CardList;
