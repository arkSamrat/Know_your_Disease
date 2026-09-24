import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auth from './Auth'
import MedAssist from './MedAssist'
import { Route,Routes } from 'react-router-dom'
import Disease from './Disease'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Auth/>}/> 
            <Route path="/api/medassist" element={<MedAssist />} />
            <Route path = "/api/disease" element={<Disease/>}/>
        </Routes>
    );
  }

export default App
