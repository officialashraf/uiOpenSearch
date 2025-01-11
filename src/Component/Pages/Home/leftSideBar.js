import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { House, ListTask, Folder, BarChart, People,Search} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import "../../../Assets/Stlyes/sideBar.css"
const  Sidebar = ()=> {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', icon: <House size={24} />, path: '/home' },
      { label: 'Search Case', icon: <Search size={24} />, path: '/search' },
    { label: 'Tasks', icon: <ListTask size={24} />, path: '/tasks' },
    { label: 'Cases', icon: <Folder size={24} />, path: '/dashboard' },
  
    // { label: 'Legals', icon: <FileEarmarkText size={24} />, path: '/legals' },
    { label: 'Reports', icon: <BarChart size={24} />, path: '/reports' },
    // { label: 'Dashboard', icon: <Grid size={24} />, path: '/dashboard' },
    // { label: 'Targets', icon: <Bullseye size={24} />, path: '/targets' },
    { label: 'Admin', icon: <People size={24} />, path: '/admin' },
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
              <span style={{ marginLeft: '1px' }}>{item.label}</span>
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </div>
  );
}

export default Sidebar;
