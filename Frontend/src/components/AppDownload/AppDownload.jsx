import React from 'react'
import { assets } from '../../assets/assets'

function AppDownload() {
  return (
    <div className='m-auto mt-[100px] text-center'>
        <p className='text-4xl font-semibold'>For Better Experience Download <br /> Tomato App</p>
        <div className='flex justify-center gap-8 mt-[40px]'>
            <img src={assets.play_store} className='max-w-[30vw, 120px] max-w-[180px] transition-[0.5s] cursor-pointer hover:scale-[1.05] transition-transform duration-300' alt="" />
            <img src={assets.app_store} className='max-w-[30vw, 120px] max-w-[180px] transition-[0.5s] cursor-pointer hover:scale-[1.05] transition-transform duration-300' alt="" />
        </div>
    </div>
  )
}

export default AppDownload