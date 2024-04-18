import { useState } from 'react'

import './App.css'
import Navbar from './components/navbar/Navbar.jsx'
import Footer from './components/footer/Footer.jsx'
import Photo from './pages/Photo.jsx'

function App() {

  return (
    <>
    <Navbar/>
    <Photo/>
    <Footer/>
    </>
  )
}

export default App
