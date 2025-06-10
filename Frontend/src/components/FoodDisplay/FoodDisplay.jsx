import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

function FoodDisplay({category}) {
    const { food_list } = useContext(StoreContext)
  return (
    <div>
        <div>
            <h2 className='mt-10 text-2xl font-semibold'>Top dishes near you</h2>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-8 row-gap-[50px]'>
                {food_list.map((food,index)=>{
                    // {console.log(category,food.category)}
                    if(category==="All" || category===food.category){
                        return <FoodItem key={index} id={food._id} name={food.name} price={food.price} description={food.description} image={food.picture.secure_url} />
                    }
                    
                })}
            </div>
        </div>
    </div>
  )
}

export default FoodDisplay