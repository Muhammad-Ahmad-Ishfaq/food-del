import React from 'react'
import {assets} from '../../assets/assets.js'

function Navbar() {
  return (
    <div className='flex justify-between items-center py-2 px-[4%]'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <img className='w-[40px]' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar