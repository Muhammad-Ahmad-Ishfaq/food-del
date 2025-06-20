import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './pages/Dashboard/Dashboard'
import Users from './pages/Users/Users'

function App() {
  const url = "https://food-del-backend-zeta.vercel.app"
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Dashboard url={url} />} />
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/orders' element={<Orders url={url} />} />
            <Route path='/users' element={<Users url={url} />} />
          </Routes>
      </div>
    </div>
  )
}

export default App
