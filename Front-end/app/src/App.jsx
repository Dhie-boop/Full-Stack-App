import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Projects from './pages/Projects';  
import Dashboard from './pages/Dashboard'; 
import ProjectDetails from './pages/ProjectDetails';

function App() {
  return (
    <Router>
      <div className='bg-gray-300 w-full h-full'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/projects" element={<Projects />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/:projectId/details" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;