import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import Feed from './pages/Feed';

const App = () => {
  return (
    <Router>
      <Navbar/>
    <Routes>
        <Route path="/" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
        <Route path="/post/new" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer position="bottom-center"
          autoClose={2000}
          theme="dark" />
      </Router>
  )
}

export default App