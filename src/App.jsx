import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import { Home } from './components/Home/Home';
import Registration from './components/Registration/Registration';
import Profile from './components/Profile/Profile';
import ProfileEdit from './components/ProfileUpdate/ProfileUpdate';
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path='/register' element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<ProfileEdit />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
