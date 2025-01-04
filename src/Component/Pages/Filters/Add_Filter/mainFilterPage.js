import React from 'react';
//import { Container } from 'react-bootstrap';
import Header from './headerFilter';
import Preheader from './preheaderFilter';
import MainContainer from './mainContainer';

const MainFilter = () => {
  return (
    <>
      <Header />
      <Preheader />
      
        <MainContainer />
     
    </>
  );
};

export default MainFilter;
