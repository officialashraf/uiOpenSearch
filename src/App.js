
//import './App.css';
//import CreateCase from './Component/Pages/Case/createCase.js';
import CardList from './Component/Pages/Home/cards.js';
import Header from './Component/Pages/Home/header.js';
import Home from './Component/Pages/Home/home';
import Pagination1 from './services/pagination.js';
import DataTable1 from './Component/Pages/Home/searchbarCrm.js';
import DataTable from './Component/Pages/Case/caseList.js';
import SearchBar from './Component/Pages/SearchPage/searchBar';
import LoginPage from './Component/User/login';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import MainFilter from './Component/Pages/Filters/Add_Filter/mainFilterPage.js';
import AddFilter2 from './Component/Pages/Filters/AddExistingFilter/addFilter2.js';
import CaseTableDataFilter from './Component/Pages/Filters/AddExistingFilter/TabularData/caseTableDataFilter.js';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />    
        <Route path="/search" element={<SearchBar/>} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/header" element={<Header/>}/>  
        <Route path="/card" element={<CardList/>}/>  
        <Route path="/table" element={<DataTable/>}/>  
        <Route path='/pagination' element={<Pagination1/>}/>
        <Route path='/data' element={<DataTable1/>}/> 
        <Route path='/filter' element={<MainFilter/>}/>
        <Route path='/existing-filter' element={<AddFilter2/>}/>
        <Route path='/tableData' element={<CaseTableDataFilter/>}/>
      
         {/* <Route path='/case' element={<CreateCase/>}/> */}
       
      </Routes>
      </BrowserRouter>
  );
    
}

export default App;
