import { Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../Store/Slice/CategorySlice'
import { fetchProducts, updateProductList } from '../../Store/Slice/ProductSlice';
import DialogModal from '../Modal/DialogModal';
import './style.css'


const Category = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("All"); // State for selected category
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Dispatch the fetchCategory async thunk on component mount
        dispatch(fetchCategory('https://fakestoreapi.com/products/categories'));
    }, [dispatch]);


    useEffect(() => {

        const handleResize = () => setWindowWidth(window.innerWidth); //This function is called whenever the window loaction change or mainpath chnage it will resized the page 
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, [])

    const data = useSelector((state) => state.CategorySlice.categoriesData);

    const handleCategoryClick = (category) => {
        console.log(category);
        setSelectedCategory(category);
        dispatch(updateProductList(category));
    }

    const handleCategoryAllClick = () => {
        setSelectedCategory("All");
        dispatch(fetchProducts('https://fakestoreapi.com/products'));
    }

    return (

        <>
            <DialogModal />
            <Box style={{ marginTop: "300px", marginBottom: "50px" }}>
                <Stack
                    direction={windowWidth < 530 ? "column" : "row"}
                    spacing={2}
                    style={{ display: "flex", justifyContent: "center", width: windowWidth < 530 ? "50%" : "", margin: "auto" }}

                >
                    <Button
                        variant="outlined"
                        onClick={() => handleCategoryAllClick()}
                        style={{ color: selectedCategory === "All" ? 'red' : 'initial' }}
                    >
                        All
                    </Button>
                    {
                        Object.entries(data).map(([key, value]) => {
                            return (
                                <Button
                                    variant="outlined"
                                    key={key}
                                    onClick={() => handleCategoryClick(value)}
                                    style={{ color: selectedCategory === value ? 'red' : 'initial' }}
                                >
                                    {value}
                                </Button>
                            )
                        })
                    }

                </Stack>
            </Box>
        </>
    )

}

export default Category;
