import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Card, CardContent, CardMedia, Box, Rating, IconButton, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import './style.css'
import { useNavigate } from "react-router-dom";
import RemoveIcon from '@mui/icons-material/Remove';
import EmprtCart from '/src/assets/EmprtCart.svg'
import { addCart, clearCart, removeFromCart, subTotlal } from "../../Store/Slice/CartSlice";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    cartItemContainer: {
        marginBottom: theme.spacing(3),
    },
    productImage: {
        width: "100%",
        height: "auto",
    },
    productName: {
        fontWeight: "bold",
    },
    productPrice: {
        color: "black",
        fontWeight: "bold",
    },

}));

const Cart = () => {
    const cart = useSelector((state) => state.CartSlice);
    const navigate = useNavigate()
    const classes = useStyles();
    const dispatch = useDispatch()
    const handleRemoveItem = (item) => {
        dispatch(removeFromCart(item))
    }
    const handleAddItem = (item) => {
        dispatch(addCart(item))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }
    useEffect(() => {
        dispatch(subTotlal())
    }, [cart])

    return (

        <div className={classes.root} style={{ paddingTop: "80px", background: "#eae2e249", }}>
            <Typography variant="h5" gutterBottom>

            </Typography>
            <Grid container spacing={1}>

                {

                    cart.cartItem.length > 0 ?
                        cart.cartItem.map((item) => {
                            console.log(item);
                            return (


                                <Grid item xs={12} key={item.id} className={classes.cartItemContainer}  >
                                    <Card >
                                        <CardContent>
                                            <Grid container spacing={2} style={{ display: "flex", alignItems: "center" }}>
                                                <Grid item container xs={1} style={{ display: "flex", alignItems: "center" }} >
                                                    <CardMedia
                                                        component="img"
                                                        className={classes.productImage}
                                                        image={item.image}
                                                        alt={item.name}

                                                        style={{ width: '160px', marginRight: '30px' }}
                                                    />
                                                </Grid>

                                                <Grid item xs={5} style={{ display: "flex", alignItems: "center", flexDirection: "column" }} >


                                                    <Typography variant="subtitle1" className="productName">
                                                        {item.title.length > 20 ? item.title.slice(0, 22) + "..." : item.title}
                                                    </Typography>
                                                    {/* <Box component="div" mt={1}> */}
                                                    <Rating
                                                        name={`rating-${item.id}`}
                                                        value={item.rating.rate}
                                                        readOnly
                                                        precision={0.5}
                                                    />
                                                    {/* </Box> */}
                                                </Grid>
                                                <Grid item container xs={3} style={{ display: "flex", alignItems: "center" }} gap={4}>

                                                    <Typography variant="subtitle2" className={classes.productPrice} fontSize="20px">
                                                        ${item.price}
                                                    </Typography>
                                                </Grid>
                                                <Grid item container xs={2} gap={3} style={{ display: "flex", alignItems: "center" }}>

                                                    <IconButton onClick={() => handleRemoveItem(item)}>
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <span style={{ fontFamily: "monospace", fontSize: "20px" }}>{item.CartQuentity}</span>
                                                    <IconButton onClick={() => handleAddItem(item)}>

                                                        <AddIcon />
                                                    </IconButton>

                                                </Grid>
                                                <Grid item container xs={1} gap={3} style={{ display: "flex", alignItems: "center", fontFamily: "monospace", fontSize: "20px", overflow: "hidden" }}>
                                                    <Typography variant="subtitle2" className={classes.productPrice} fontSize="20px">
                                                        ${item.CartQuentity * item.price}

                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                        : (
                            < >
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%" }}>

                                    <img src={EmprtCart} alt="" style={{ width: "100%", height: "60vh" }} />
                                    <button className="backButton" style={{ marginTop: "70px ", width: "20%", background: "rgb(151 148 218 / 43%)" }} onClick={() => navigate("/")}>
                                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                                        <span>Back</span>
                                    </button>
                                </div>
                            </>

                        )
                }
            </Grid>
            {
                cart.cartItem.length > 0 ?
                    <Grid container style={{ marginTop: "60px" }}>

                        <Grid item xs={9}>

                            <button className="ClearCartButton" onClick={() => handleClearCart()}>
                                <p>Clear Cart</p>
                            </button>
                        </Grid>
                        <Grid item xs={3} lineHeight={"25px"}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", alignItems: "center" }}>

                                <h2>Sub Total</h2>
                                <span>
                                    ${cart.cartTotalAmount}
                                </span>
                            </div>
                            <span style={{ color: "#23212184" }}>Taxes and shipping calculated at checkout</span>
                            <Button style={{ width: "100%", background: "#cca1a16c", marginTop: "30px", color: "#e82cc9", }}>
                                Checkout
                            </Button>

                            <button className="cta" style={{ marginTop: "30px" }}>
                                <span className="hover-underline-animation" onClick={() => { navigate("/") }}> Continue Shopping  </span>
                                <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                                    <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                                </svg>
                            </button>
                        </Grid>
                    </Grid>

                    :

                    <div></div>


            }

        </div >
    );
};

export default Cart;
