import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Profile from './components/Profile/Profile';
import ProfileEdit from './components/ProfileUpdate/ProfileUpdate';
import TakeExam from './components/Exam/TakeExam';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import { QuizDetails } from './components/QuizDetails/QuizDetails';
import LanguageDropdown from './components/LanguageDropDown/LanguageDropDown';
import ExamRegistration from './components/ExamRegistration/ExamRegistration';
import LoginForExam from './components/LoginForExam/LoginForExam';

const App = () => {
  const email = sessionStorage.getItem('email');
  const location = useLocation();

  // Define the paths where the Navbar should not appear
  const hideNavbarRoutes = ['/login-for-exam'];

  return (
    <>
      <LanguageDropdown />
      
      {/* Conditionally render Navbar if the current path is not in hideNavbarRoutes */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/login-for-exam" element={<LoginForExam />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/exam" element={<TakeExam />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<ProfileEdit />} />
        <Route path="/home" element={<QuizDetails />} />
        <Route path="/exam-registration" element={<ExamRegistration />} />
      </Routes>
    </>
  );
};

export default App;
