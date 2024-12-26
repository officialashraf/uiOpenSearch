import React from 'react';
import { Navbar, Nav, Button,Container, Row, Col,Badge } from 'react-bootstrap';
import { FaFileAlt,FaArrowLeft, FaChartLine } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setSelectedTab } from '../../../../Redux/Action/caseAction';
import '../../../../Assets/Stlyes/headerfilter.css';

const HeaderFilter = () => {
  const dispatch = useDispatch();

  return (
    <Navbar bg="light" expand="lg" className="justify-content-between">

      <Container className='custom-containerH'>  <Row className="w-100">
        <Col xs={1} className="d-flex align-items-center justify-content-center">
          <FaArrowLeft style={{ cursor: 'pointer' }} onClick={() => window.history.back()} />
        </Col>
        <Col xs={11}>
          <Nav className="flex-column">
            <Nav.Item className="d-flex align-items-center">
              <span>ID: </span>
              </Nav.Item> 
              <Nav.Item>
             <h5> Name  </h5> <FaFileAlt className="ml-3" />  <Badge pill bg="dark">
             <span><ul><li >Status</li></ul></span>
               </Badge>
              </Nav.Item>
             
           
          </Nav>
        </Col>
      </Row>
      
      </Container>
      <Button variant="outline-primary" className='button' onClick={() => dispatch(setSelectedTab('analyze'))}>
        <FaChartLine /> Analyze
      </Button>
    </Navbar>
  );
};

export default HeaderFilter;
