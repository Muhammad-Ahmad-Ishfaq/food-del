import React from 'react'
import { assets } from '../../assets/assets'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebar-options'>
            <NavLink to="/" className='sidebar-option'>
                <img src={assets.house} className='w-6' alt="" />
                <p className='text-xs'>Dashboard</p>
            </NavLink>
            <NavLink to="/add" className='sidebar-option'>
                <img src={assets.add_icon} alt="" />
                <p className='text-xs'>Add Items</p>
            </NavLink>
            <NavLink to="/list" className='sidebar-option'>
                <img src={assets.order_icon} alt="" />
                <p className='text-xs'>List Items</p>
            </NavLink>
            <NavLink to="/orders" className='sidebar-option'>
                <img src={assets.order_icon} alt="" />
                <p className='text-xs'>Orders</p>
            </NavLink>
            <NavLink to="/users" className='sidebar-option'>
                <img src={assets.person} className='w-6' alt="" />
                <p className='text-xs'>Users</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar