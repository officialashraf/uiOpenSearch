import React from 'react';
//import { Container } from 'react-bootstrap';
import Header from './headerFilter';
import Preheader from './preheaderFilter';
import MainContainer from './mainContainer';

const MainFilter = ({ onAnalyzeClick }) => {
  return (
    <>
      <Header onAnalyzeClick={onAnalyzeClick} />
      <Preheader />
      
        <MainContainer />
     
    </>
  );
};

export default MainFilter;
