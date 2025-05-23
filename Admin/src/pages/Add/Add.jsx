import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function Add({ url }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad'
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

//   const uploadToCloudinary = async (image) => {
//     const formData = new FormData();
//     formData.append('file', image);
//     formData.append('upload_preset', 'your_upload_preset'); // replace with your Cloudinary preset
//     formData.append('cloud_name', 'your_cloud_name'); // replace with your Cloudinary cloud name

//     const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/public/images', formData);
//     return response.data;
//   };

  const onSubmitHandler = async (event) => {
  event.preventDefault();

  if (!imageFile) {
    toast.error('Please select an image.', { autoClose: 1000 });
    return;
  }

  const formData = new FormData();
  formData.append('picture', imageFile); // name must match multer.single('picture')
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('price', data.price);
  formData.append('category', data.category);

  try {
    const response = await axios.post(`${url}/api/food/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true,
    });

    if (response.data.success) {
      setData({ name: '', description: '', price: '', category: 'Salad' });
      setImageFile(null);
      setImagePreview(null);
      toast.success(response.data.message, { autoClose: 1000 });
    } else {
      toast.error('Failed to add product.', { autoClose: 1000 });
    }
  } catch (error) {
    console.error(error);
    toast.error('An error occurred. Please try again.');
  }
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className='w-[70%] ml-[max(5vw,25px)] mt-[50px] text-[#6d6d6d] text-[16px]'>
      <form className='flex-col' onSubmit={onSubmitHandler} encType="multipart/form-data">
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={imagePreview ? imagePreview : assets.upload_area} alt='' />
          </label>
          <input name="picture" onChange={handleImageChange} type='file' id='image' hidden required />
        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' />
        </div>
        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Write content here' required></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select onChange={onChangeHandler} name='category' value={data.category}>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noddles'>Noddles</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='$20' />
          </div>
        </div>
        <button className='add-btn'>Add Product</button>
      </form>
    </div>
  );
}

export default Add;
