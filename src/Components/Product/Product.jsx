import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Store/Slice/ProductSlice'
import LoadingComponent from '../Loading/loading';
import { Badge, Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import './style.css'
import { makeStyles } from '@material-ui/core';
import DialogModal from '../Modal/DialogModal';
import { addCart } from '../../Store/Slice/CartSlice';
import { ShoppingCartSharp } from '@mui/icons-material'
import { addLike, likedproduct } from '../../Store/Slice/LikeSlice';
import { useNavigate } from 'react-router-dom';


const Product = () => {
  const loggedIn = useSelector((state) => state.SignupSlice.loggedIn)

  const [isLoad, setIsLoad] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const data = useSelector((state) => state.ProductSlice.productsData);
  const cartItem = useSelector((state) => state.CartSlice);




  // ---------------------------------------- MUI --------------------------------------------------------
  const useStyles = makeStyles(theme => ({
    titleContainer: {
      position: 'relative',
      // // marginBottom: theme.spacing(4),
      textAlign: 'center',
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      margin: 0,
      padding: 0,
      position: 'relative',
      zIndex: 1,
      display: 'inline-block',
      background: 'linear-gradient(to right, #ff093e, #b2450b)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      '-webkit-text-fill-color': 'transparent',
      '-webkit-box-decoration-break': 'clone',
      // '-webkit-box-reflect': 'below 1px linear-gradient(transparent, #0005)',
      '&::after': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: theme.palette.background.default,
        opacity: 0.8,
      },


    },
  }));
  const classes = useStyles();

  // ----------------------------------- USEEFFECT -------------------------------------------------------------

  useEffect(() => {
    dispatch(fetchProducts('https://fakestoreapi.com/products'));
  }, [dispatch]);

  useEffect(() => {

    if (!data) {
      setIsLoad(true);
    } else {
      setIsLoad(false);
    }
  }, [data]);


  // ------------------------------------------------------------------------------------------------

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => setOpenDialog(false);


  const [selectedProduct, setselectedProduct] = useState(null)
  const handleClick = (value) => {
    setOpenDialog(true)
    setselectedProduct(value)
  }

  const [cart, serCart] = useState({});
  const handleShoppingCart = (productId, product) => {

    dispatch(addCart(product))
    serCart((prevCart) => ({
      ...prevCart,
      [productId]: !prevCart[productId],
    }));

  }


  const likedProduct = useSelector((state) => state.LikeSlice.likeItem);
  const handleFavIconBtn = (value) => {
    const isLiked = likedProduct.some((product) => product.id === value.id);

    if (isLiked) {
      dispatch(likedproduct(likedProduct.filter((product) => product.id !== value.id)));
    } else {
      dispatch(likedproduct([...likedProduct, value]));
    }
    dispatch(addLike(value));
  };


  return (

    <>
      {
        isLoad ? (<LoadingComponent />)
          : (
            <>
              <Container style={{ backgroundColor: "#d0c3c313", borderRadius: "20px", maxWidth: "1310px", paddingTop: "80px", marginBottom: "40px" }}>
                <div className={classes.titleContainer}>
                  <Typography variant="h1" className={classes.title}>
                    Best Products
                  </Typography>
                </div>

                <Grid container spacing={2}>
                  {Object.entries(data).map(([key, value]) => {

                    return (

                      <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                        <Card style={{ margin: "20px 0px", cursor: "pointer" }} >
                          <CardMedia
                            component="img"
                            height="240"
                            image={value.image}
                            alt="Paella dish"
                            onClick={() => handleClick(value)}
                          />
                          <CardContent  >
                            <Typography variant="body2" color="text.secondary" className="ProductCardContent" onClick={() => handleClick(value)}>
                              {value.description}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing style={{ display: "flex", justifyContent: "space-between" }}>



                            <div>

                              <IconButton
                                aria-label="add to favorites"
                                style={{ color: likedProduct.some((product) => product.id === value.id && loggedIn) ? "red" : "" }}
                                onClick={() => handleFavIconBtn(value)}
                                disabled={!loggedIn}
                                
                              >

                                <FavoriteIcon style={{ border: "black" }} />

                              </IconButton>

                              <IconButton aria-label="share">
                                <ShareIcon />
                              </IconButton>

                            </div>

                            <div>
                              <IconButton
                                style={{ background: cart[value.id] ? '#af9a9a21' : '' }}
                                onClick={() => handleShoppingCart(value.id, value)}
                                disabled={!loggedIn}
                              >
                                <Badge badgeContent={cartItem.cartItem.CartQuentity} color="secondary">
                                  <ShoppingCartSharp />
                                </Badge>
                              </IconButton>
                            </div>

                          </CardActions>
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
              </Container>


              {selectedProduct && (
                <DialogModal
                  fullwidth
                  product={selectedProduct}
                  open={openDialog}
                  handleClose={handleCloseDialog}
                />

              )}

            </>
          )
      }
    </>
  )


}



export default Product
