import React from 'react'
import Category from '../../Components/Category/Category';
import HeroBanner from '../../Components/HeroBanner/HeroBanner'
import Product from '../../Components/Product/Product'

const Home = () => {


  return (
    <>
      <HeroBanner  />
      <Category />
      <Product  />
    </>
  )
}

export default Home