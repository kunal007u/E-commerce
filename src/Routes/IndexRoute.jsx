import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import LoadingComponent from '../Components/Loading/loading';
import Header from '../Components/Navbar/Header';
import Product from '../Components/Product/Product';
import About from '../Pages/About/About';
import Contact from '../Pages/Contact/Contact';
import Error from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from '../Components/Cart/Cart';
import Like from '../Components/Like/Like';
import Signup from '../Components/Signup/Signup';
import Login from '../Components/Login/Login';

const IndexRoute = () => {
  const loggedIn = useSelector((state) => state.SignupSlice.loggedIn);
  const navigate = useNavigate()
  console.log(loggedIn);

  React.useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
    <>

      <>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Product />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/likePage" element={<Like />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />

        </Routes>
        <Footer />
      </>

    </>
  );
};

export default IndexRoute;
