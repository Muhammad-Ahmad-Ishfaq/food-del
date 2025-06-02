import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

function LoginPopup({ setShowLogin }) {
  const { url, setToken, setRole } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value })
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        if (response.data.role !== undefined) {
          setRole(response.data.role);
          localStorage.setItem("role", response.data.role);
        }

        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert("Login error: " + err.message);
    }
  }

  return (
    <div className='absolute z-[1] w-full h-full bg-[#00000090] grid'>
      <form onSubmit={onLogin} className='place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex-col gap-[25px] py-[25px] px-[30px] rounded-[8px] text-[14px]'>
        <div className='flex justify-between items-center text-black'>
          <h2 className='text-2xl font-semibold'>{currState}</h2>
          <img onClick={() => setShowLogin(false)} className='w-[16px] cursor-pointer' src={assets.cross_icon} alt="" />
        </div>
        <div className='login-popup-inputs'>
          {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} className='border' type="text" placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} className='border' type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} className='border' type="password" placeholder='Your password' required />
        </div>
        <div className='flex justify-center items-center mt-5'>
          <button type='submit' className='p-2 lg:w-80 sm:w-80 border-none text-white bg-[tomato] rounded-[4px]'>
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
        </div>
        <div className='flex items-start gap-[8px] mt-[15px]'>
          <input className='mt-[5px]' type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <div className='mt-5'>
          {currState === "Login"
            ? <p>Create a new account? <span className='text-[tomato] font-semibold cursor-pointer' onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            : <p>Already have an account? <span className='text-[tomato] font-semibold cursor-pointer' onClick={() => setCurrState("Login")}>Login here</span></p>
          }
        </div>
      </form>
    </div>
  )
}

export default LoginPopup
