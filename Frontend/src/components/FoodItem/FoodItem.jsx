import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext';


function FoodItem({id,name,price,description,image}) {
    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext)
    
  return (
    <div className='food-item'>
        <div className='relative'>
            <img
          className="w-full rounded-t-lg hover:scale-[1.05] transition-transform duration-300 cursor-pointer"
          src={image}  // <-- Use image URL directly
          alt={name}
        />
            {!cartItems[id]
                    ? <img onClick={()=>addToCart(id)} className='absolute w-[35px] bottom-[15px] right-[15px] cursor-pointer rounded-[50px] hover:scale-[1.05] transition-transform duration-300' src={assets.add_icon_white} alt='' />
                    :<div className='absolute bottom-[15px] right-[15px] flex items-center gap-[10px] p-[10px] rounded-[50px] bg-white bg-opacity-70'>
                        <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
            }
        </div>
        <div className='p-5'>
        <div className='flex justify-between items-center mb-[10px]'>
            <p className='text-[20px] font-semibold'>{name}</p>
            <img className='w-[70px]' src={assets.rating_starts} alt="" />
        </div>
        <p className='text-[14px] text-[#676767]'>{description}</p>
        <p className='text-[tomato] text-[22px] font-semibold mt-[10px]'>${price}</p>
        </div>
    </div>
  )
}

export default FoodItem