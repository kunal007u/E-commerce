import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'
import { removeLikeItem } from '../../Store/Slice/LikeSlice';
import Emprtwishlist from "/src/assets/Emprt-wishlist.webp"
import { useNavigate } from 'react-router-dom';


const Like = () => {
    const navigate = useNavigate()

    const likeData = useSelector((state) => state.LikeSlice)
    const dispatch = useDispatch()
    const handleRemoveItem = (item) => {
        dispatch(removeLikeItem(item))
    }


    if (likeData.likeItem.length == 0) {
        return (
            <article className="article">
                <img className="image" src={Emprtwishlist} alt="background" />
                <h1 className="header">Wishlist Is Empty </h1>
                <div style={{  width: "100%", display:"felx"  }} className="GoBackbutton">

                   
                    <button className="LikebackButton" style={{ marginTop: "70px ", width: "20%", background: "rgb(151 148 218 / 43%)" }} onClick={() => navigate("/")}>
                        <svg height="20" width="18" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                        <span>Back</span>
                    </button>
                </div>
            </article>
        )
    }

    return (

        <>
            <div style={{ paddingTop: "80px", background: "#eae2e249", }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Rating</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Stock status</TableCell>
                                <TableCell align="center">Delete </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {likeData.likeItem.map((item) => {
                                console.log(item);
                                return (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left" >
                                            <img src={item.image} width="100px" alt="" />

                                        </TableCell>
                                        <TableCell align="left">{item.title}</TableCell>
                                        <TableCell align="center">{item.rating.rate}</TableCell>
                                        <TableCell align="center">{item.price}</TableCell>
                                        <TableCell align="center">in stock </TableCell>
                                        <TableCell align="center">
                                            <IconButton aria-label="remove" onClick={() => handleRemoveItem(item)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default Like