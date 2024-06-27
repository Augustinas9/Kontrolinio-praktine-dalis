import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './services/privateRoutes';
import { AuthProvider } from './services/AuthContext';
import Navbar from "./components/pages/Navbar";
import Login from './components/pages/Login';
import Registration from "./components/pages/Registration";
import Create from "./components/pages/projectsDashboard/Create";
import CategoryDetails from "./components/pages/projectsDashboard/CategoryDetails";
import EditCategory from "./components/pages/projectsDashboard/EditCategory";
import HomeWelcome from './components/pages/projectsDashboard/HomeWelcome';
import CategoryList from './components/pages/projectsDashboard/CategoryList';
import Home from "./components/pages/projectsDashboard/Home";
import './styles/ProjectList.css';
import './styles/Navbar.css';
import './styles/Login.css';
import './styles/Create.css';
import './styles/TaskBoard.css';
import CreateTask from './components/pages/tasksDashboard/CreatePoster';
import Admin from './components/pages/Admin/AdminBoard';

import EditPoster from './components/pages/tasksDashboard/EditPoster';

import TaskBoard from './components/pages/tasksDashboard/TaskBoard';

function App() {

  const colors = ['#1b6e3060', '#5EA2E265', '#F6E17090', '#000'];
  const [colorIndex, setColorIndex] = useState(0); // State to keep track of the current color index

  const changeColor = () => {
    const nextIndex = (colorIndex + 1) % colors.length; // Calculate next color index
    setColorIndex(nextIndex); // Update the color index state
  };

  return (
    <Router>
      <AuthProvider>
      <div className='App'>
          <Navbar />
          <div className='content' style={{ backgroundColor: colors[colorIndex] }}>

            <Routes>
            <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              {/* <Route path="/admin" element={<PrivateRoute roles={['Admin']}>{<Admin />}</PrivateRoute>} /> */}
              <Route path="/" element={<PrivateRoute roles={['User', 'Admin']}><Home /></PrivateRoute>} />
              <Route path="/list" element={<PrivateRoute roles={['User', 'Admin']}><Home /></PrivateRoute>} />
              
              <Route path="/create" element={<PrivateRoute roles={['User', 'Admin']}><Create /></PrivateRoute>} />
              <Route path="/categories/:id" element={<PrivateRoute roles={['User', 'Admin']}><CategoryDetails /></PrivateRoute>} />
              <Route path="/categories/:id/edit" element={<PrivateRoute roles={['User', 'Admin']}><EditCategory /></PrivateRoute>} />
              <Route path='/categories/:categoryId/posters/:posterId/edit' element={<PrivateRoute roles={['User', 'Admin']}><EditPoster /></PrivateRoute>} /> {/* Route for EditPoster */}


              <Route path="/categories/:id/create-task" element={<PrivateRoute roles={['User', 'Admin']}><CreateTask /></PrivateRoute>} />
              <Route path="/categories/:id/taskboard" element={<PrivateRoute roles={['User', 'Admin']}><TaskBoard /></PrivateRoute>} />
          </Routes>
          </div>
          <footer onClick={changeColor}>CLICK</footer>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;