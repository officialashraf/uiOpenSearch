
//import './App.css';
import Home from './Component/Pages/Home/home';
import SearchBar from './Component/Pages/SearchPage/searchBar';
import LoginPage from './Component/User/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />     {/* Home page ka route */}
        <Route path="/search" element={<SearchBar/>} /> {/* About page ka route */}
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </Router>
  );
    
}

export default App;
