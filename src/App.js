
//import './App.css';
import CardList from './Component/Pages/Home/cards.js';
import Header from './Component/Pages/Home/header.js';
import Home from './Component/Pages/Home/home';
import DataTable from './Component/Pages/Home/table.js';
import SearchBar from './Component/Pages/SearchPage/searchBar';
import LoginPage from './Component/User/login';
import { BrowserRouter , Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />     {/* Home page ka route */}
        <Route path="/search" element={<SearchBar/>} /> {/* About page ka route */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/header" element={<Header/>}/>  
        <Route path="/card" element={<CardList/>}/>  
        <Route path="/table" element={<DataTable/>}/>  
      </Routes>
      </BrowserRouter>
  );
    
}

export default App;
