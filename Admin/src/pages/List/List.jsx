import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './List.css'

function List({url}) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`, {
        withCredentials: true,    
        headers: { "Content-Type": "application/json" }
      })
      console.log(response.data)
      if(response.data.success){
        setList(response.data.food)
      }
      else{
        toast.error("Error", {autoClose: 1000})
      }
    } catch (error) {
      
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.delete(`http://localhost:4000/api/food/${foodId}`)
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message, {autoClose: 1000})
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='p-16 flex-col'>
      <p className='text-2xl font-semibold text-center underline'>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list?.map((food,index)=>{
          return (
            <div key={index} className='list-table-format'>
              <img src={food.picture.secure_url} alt="Product image" />
              <p>{food.name}</p>
              <p>{food.category}</p>
              <p>${food.price}</p>
              <p onClick={()=>removeFood(food._id)} className='cursor-pointer text-red-600'>Delete</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List