import React from "react";
import { assets } from "../../assets/assets";
import './Footer.css'

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* left */}
        
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            mollitia minima dolorum reiciendis laborum quam, nam at repellendus,
            ea ipsam libero consectetur quisquam nemo sit, quos unde!
            Voluptatibus velit quo, nobis totam ea blanditiis? Odio magnam
            voluptatibus cum rerum molestias.
          </p>
          <div className="flex w-[40px] mt-15px gap-3 cursor-pointer">
            <img src={assets.facebook_icon} className="hover:scale-[1.05] transition-transform duration-300" alt="" />
            <img src={assets.twitter_icon} className="hover:scale-[1.05] transition-transform duration-300" alt="" />
            <img src={assets.linkedin_icon} className="hover:scale-[1.05] transition-transform duration-300" alt="" />
          </div>
        </div>
        {/* center */}
        <div className="footer-content-center">
          <h2 className="text-2xl font-semibold text-white">COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        {/* right */}
        <div className="footer-content-right">
          <h2 className="text-2xl font-semibold text-white">Get in touch</h2>
          <ul>
            <li>92316-1234567</li>
            <li>canteen@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-[2px] mt-[20px] bg-gray-500 border-none" />
      <p>
        Copyright 2025 © canteen.com - All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
