import React from 'react'

import Announcement  from '../../Compenements/Announcement';
import Categories from '../../Compenements/Categories';
import Navbar from '../../Compenements/Navbar';
import Slider from '../../Compenements/Slider';
import Footer from '../../Compenements/Footer' ;
import Newsletter from '../../Compenements/Newsletter' ;
import Products from '../../Compenements/Products';


const Home = () => {
  return (
    <div>

    <Announcement/>
    <Navbar />
    <Slider/>
    <Categories/>
    <Products/>
    <Newsletter/>
    <Footer/>


    </div>
  )
}

export default Home