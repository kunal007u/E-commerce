import { Button } from '@mui/material'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom';
import Error from "/src/assets/img/Error.svg"


const ErrorPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/', { replace: true });
    }
    return (
        <div style={{ paddingTop: "80px", marginBottom: "30px", background: "#c4b4b469 ", height: " 74vh" }}>

            <LazyLoadImage
                alt="demonstration1"
                width={"100%"}
                height={500}
                src={Error}
                style={{ marginBottom: "30px" }}
            />
            <Button
                variant="contained"
                style={{ display: "flex", justifyContent: "center", margin: "0 auto", width: "15%" }}
                onClick={handleClick}
            >
                Go Back
            </Button>
        </div>
    )
}

export default ErrorPage