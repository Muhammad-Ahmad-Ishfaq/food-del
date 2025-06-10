import React, { useContext, useState } from "react";
import Logo from "../../assets/logo.png";
import Search from "../../assets/search_icon.png";
import Basket from "../../assets/basket_icon.png";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import './Navbar.css'
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, role, setRole } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setRole(null);
    navigate("/");
  };

  return (
    <div className="pt-8 flex justify-between">
      <div>
        <Link to='/'><img src={Logo} alt="" className="w-[150px]" /></Link>
      </div>
      <div className="lg:block hidden">
        <ul className="flex gap-[20px] text-[#49557e] text-[18px]">
          <Link
            to='/'
            className={`cursor-pointer ${menu === "home" ? "border-b-2 border-[#49557e] pb-[2px]" : ""}`}
            onClick={() => setMenu("home")}
          >
            home
          </Link>
          <a
            href='#explore-menu'
            className={`cursor-pointer ${menu === "menu" ? "border-b-2 border-[#49557e] pb-[2px]" : ""}`}
            onClick={() => setMenu("menu")}
          >
            menu
          </a>
          <a
            href='#app-download'
            className={`cursor-pointer ${menu === "mobile-app" ? "border-b-2 border-[#49557e] pb-[2px]" : ""}`}
            onClick={() => setMenu("mobile-app")}
          >
            mobile-app
          </a>
          <a
            href='#footer'
            className={`cursor-pointer ${menu === "contact-us" ? "border-b-2 border-[#49557e] pb-[2px]" : ""}`}
            onClick={() => setMenu("contact-us")}
          >
            contact us
          </a>
        </ul>
      </div>
      <div className="flex justify-center items-center gap-[40px]">
        <div>
          <img src={Search} alt="" />
        </div>
        <div>
          <Link to="/cart"><img src={Basket} alt="" className="cart-icon-container" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <div>
          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-transparent text-[16px] text-[#49557e] border border-orange-600 pt-[10px] pr-[30px] pl-[30px] pb-[10px] rounded-full cursor-pointer hover:bg-[#fff4f2] transition-all"
            >
              Sign in
            </button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                {role === 1 && (
                  <li onClick={() => window.open("http://localhost:5174", "_blank")}>
                    <img src={assets.dashboard_icon} alt="" />
                    {/* <LayoutDashboard /> */}
                    <p>Dashboard</p>
                  </li>
                )}
                <hr />
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
