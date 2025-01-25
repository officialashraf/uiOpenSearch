import React from 'react';
import { Navbar, Nav, Button,Container, Row, Col,Badge } from 'react-bootstrap';
import { FaFileAlt,FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
//import { setSelectedTab } from '../../../../Redux/Action/caseAction';
import '../../../../Assets/Stlyes/headerfilter.css';
import { useNavigate } from 'react-router-dom';
import CaseData from '../AddExistingFilter/TabularData/caseData';

const HeaderFilter = () => {
  //const dispatch = useDispatch();
  const caseData1 = useSelector((state) => state.caseData.caseData);
  console.log("headeData", caseData1)
  const navigate = useNavigate()
  const  handleClick =()=>{
   navigate('/tableData')
  }

  return (
    <Navbar expand="lg" className="justify-content-between" style={{background:"lightgray"}}>

      <Container className='custom-containerH'>  <Row className="w-100">
        <Col xs={1} className="d-flex align-items-center justify-content-center">
          <FaArrowLeft style={{ cursor: 'pointer',margin:'0px' }}  onClick={() => navigate(-1)} />
        </Col>
        <Col xs={11}>
          <Nav className="flex-column">
            <Nav.Item className="d-flex align-items-center">
              <span>ID: {caseData1.id}</span>
              </Nav.Item> 
              <Nav.Item>
             <span className='caseName'>{caseData1.title} </span> <FaFileAlt className="ml-3" />  <Badge pill bg="dark">
             <span><ul><li >Status</li></ul></span>
               </Badge>
              </Nav.Item>
             
           
          </Nav>
        </Col>
      </Row>
      
      </Container>
      <Button  className='analyze-btn' onClick={handleClick} >
        {/* <FaChartLine /> */}
         Analyze
      </Button>
    </Navbar>
  );
};

export default HeaderFilter;
