import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Profile from './components/Profile/Profile';
import ProfileEdit from './components/ProfileUpdate/ProfileUpdate';
import TakeExam from './components/Exam/TakeExam';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/exam" element={<TakeExam />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<ProfileEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
