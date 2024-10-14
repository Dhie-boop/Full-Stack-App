// src/App.jsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login'; // Ensure case matches the file name
import Home from './components/Home'; // Ensure case matches the file name
import Navigation from './components/Navigation'; // Ensure case matches the file name
import Logout from './components/logout'; // Ensure case matches the file name

function App() {
  return ( // Added parentheses around the return statement
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
