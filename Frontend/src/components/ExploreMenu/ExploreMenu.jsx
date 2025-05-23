import React from "react";
import { menu_list } from "../../assets/assets.js";

function ExploreMenu({ category, setCategory }) {
  return (
    <div>
      <div className="flex-col gap-[20px]">
        <h1 className="text-2xl font-semibold text-[#262626]">
          Explore our menu
        </h1>
        <p className="max-w-[60%] text-[#808080]">
          Choose for a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <div className="flex justify-between items-center gap-[30px] text-center mt-[20px] overflow-scroll">
          {menu_list.map((item, index) => {
            return (
              <div
                onClick={() =>
                  setCategory(prev=>prev===item.menu_name?"All":item.menu_name)
                }
                key={index}
              >
                  <img
  className={`p-[2px] w-[7.5vw] min-w-[80px] cursor-pointer rounded-full transition-all duration-200
    border-4 border-solid ${
      category === item.menu_name 
        ? "border-red-500" 
        : "hover:border-red-400 rounded-full"
    }`
  }
  src={item.menu_image}
  alt=""
/>
                <p className="text-[#747474] mt-[10px] text-xl cursor-pointer">
                  {item.menu_name}
                </p>
              </div>
            );
          })}
        </div>
        <hr className="mt-[10px] h-[2px] bg-[#e2e2e2]" />
      </div>
    </div>
  );
}

export default ExploreMenu;
