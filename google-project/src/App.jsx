import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Homepage2 from './pages/homepage2'

function App() {

// Replace these lines in App.jsx:
const REACT_APP_FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const REACT_APP_FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const REACT_APP_FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const REACT_APP_FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const REACT_APP_FIREBASE_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const REACT_APP_FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Homepage2' element={<Homepage2 />}></Route>
      </Routes>
    </Router>
  )
}

export default App