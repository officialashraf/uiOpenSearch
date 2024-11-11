import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { Cpu, FileEarmarkText, Bell, PinAngle, ChatLeftText } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import "../../../Assets/Stlyes/rightSideBar.css"
const  RightSidebar = ()=> {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Gemini', icon: <Cpu size={24} />, path: '/gemini' },
    { label: 'Docs', icon: <FileEarmarkText size={24} />, path: '/documents' },
    { label: 'Pin', icon: <PinAngle size={24} />, path: '/pin' },
    { label: 'Comments', icon: <ChatLeftText size={24} />, path: '/ comments' },
    { label: 'Notification', icon: <Bell size={24} />, path: '/notification' },
   
  ];

  return (
    <div style={{  width: '80px', backgroundColor: '#000', color: '#fff', paddingTop: '1rem' }}>
      <Container>
        <Nav className="flex-column align-items-center" >
          {menuItems.map((item, index) => (
            <Nav.Link
              key={index}
              onClick={() => navigate(item.path)}
              style={{ color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px', textAlign: 'center', marginBottom: '1rem' }}
            >
              {item.icon}
              <span style={{ marginRight: '1px' }}>{item.label}</span>
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </div>
  );
}

export default RightSidebar;
