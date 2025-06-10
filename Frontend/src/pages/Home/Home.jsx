import React, { useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import AppDownload from '../../components/AppDownload/AppDownload.jsx'

function Home() {
    const [category, setCategory] = useState("All")
  return (
    <div>
        <div>
            <Header />   
            <ExploreMenu category={category} setCategory={setCategory} />   
            <FoodDisplay category={category} /> 
            <AppDownload /> 
        </div>
    </div>
  )
}

export default Home