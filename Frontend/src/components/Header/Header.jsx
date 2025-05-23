import React from 'react'
import Main from '../../assets/header_img.png'
import './Header.css'

function Header() {
  return (
    <div className='h-[34vw] my-[30px] mx-auto bg-contain relative'>
        <img src={Main} alt="" />
        <div className='header-content'>
            <h2 className='pb-6 font-semibold lg:text-6xl text-white text-3xl'>Order your <br /> favourite food here</h2>
            <p className='hidden lg:block pb-6 text-white text-md'>Choose for a diverse menu featuring a delectable array of dishes crafted with the <br /> finest ingredients and culiinary expertise. Our mission is to satisfy your cravings and <br /> elevate your dining experience, one delicious meal at a time.</p>
            <button className='text-[#747474] p-[1vw_2.3vw] bg-white text-sm font-semibold rounded-[50px]'>View Menu</button>
            
        </div>
    </div>
  )
}

export default Header