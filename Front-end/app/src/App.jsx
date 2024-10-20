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
import Logout from './pages/Logout';
import { AuthProvider } from './AuthContext/AuthContext';
import UserProjects from './pages/UserProjects';	
import UserProjectDetails from './pages/UserProjectDetails';
import CreateProject from './pages/CreateProject';
import CreateDetails from './pages/CreateDetails';
import UpdateProject from './pages/UpdateProject';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className='bg-gray-300 w-full h-full'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/projects" element={<Projects />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/projects/:projectId/details" element={<ProjectDetails />} />


            <Route path="/user-projects" element={<UserProjects />} />
            <Route path="/user-projects/:projectId/details" element={<UserProjectDetails />} />

            <Route path="/createproject" element={<CreateProject />} />
            <Route path="/createdetails" element={<CreateDetails />} />

            <Route path="/user-projects/:project_id/update" element={<UpdateProject />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
