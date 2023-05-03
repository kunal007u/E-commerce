import React, { useEffect, useState } from 'react'
import ContactForm from '/src/Components/ContactForm/ConatctForm.jsx'
import { Box, Grid, Typography } from "@mui/material";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ContactUs from '/src/assets/img/contactUs.svg'

const Contact = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {

        const handleResize = () => setWindowWidth(window.innerWidth); //This function is called whenever the window loaction change or mainpath chnage it will resized the page 
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, [])
    return (
        <div style={{ paddingTop: "100px", background: "#eae2e249", height:"46rem" }}>

            <Box >
                <Typography variant="h4" align="center" mb={5}>
                    Contact Us
                </Typography>
                <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} md={6}>

                        <LazyLoadImage
                            alt="demonstration1"
                            width={"100%"}
                            height={500}
                            src={ContactUs}
                            style={{display: windowWidth < 900 ? 'none' : 'block'}}
                        />

                    </Grid>


                    <Grid item xs={12} md={6}>
                        <ContactForm />
                    </Grid>
                </Grid>
            </Box>
        </div>

    )
}

export default Contact