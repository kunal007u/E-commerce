import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import heroImage from '/src/assets/img/HeroBanner.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './style.css'
import { useNavigate } from 'react-router-dom';


const HeroBanner = () => {
  const navigate = useNavigate()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth); //This function is called whenever the window loaction change or mainpath chnage it will resized the page 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [])
  return (
    <Box sx={{ position: 'relative', zIndex: "1" }} >
      {/* <img src={heroImage} alt="Hero Image" style={{ width: '100%' }} /> */}
      <LazyLoadImage
        alt="demonstration1"
        style={{ width: '100%', height: '70vh' }}
        src={heroImage}
        className="heroBanner"
      />
      <Box
        className="wear-the-best"
        sx={{
          position: 'absolute',
          top: '108%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '100%',
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          width: "60%",
          backgroundColor: "#7f777722",
          padding: "10px",
          borderRadius: "10px",
          flexDirection: windowWidth < 400 ? "column" : "row",
        }}>
        <Typography
          variant="h2"
          gutterBottom
          style={{ fontWeight: "700", lineHeight: "100px", display: "flex", textAlign: "center" }}
          className="banner"
        >
          Wear the <br /> best
        </Typography>

        <button className="cta">
          <span className="hover-underline-animation" onClick={()=>{navigate("/products")}}> Shop now </span>
          <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
          </svg>
        </button>
      </Box>
    </Box>
  );
};

export default HeroBanner;
