import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Rating,
} from '@mui/material';
import { Box } from '@mui/system';

const ProductModal = ({ open, handleClose, product }) => {
    
    if (!product) {
        return null
    }
    const { title, price, description, category, image, rating } = product;
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle style={{ fontSize: "30px" }}>{title}</DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom style={{ color: "lightcoral" }}>
                    Price: {price} $
                </Typography>

                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>


                    <Typography variant="h6" gutterBottom style={{ color: "black" , background:"#dcd3d361", padding:"5px", borderRadius:"4px", cursor:"pointer" }}>
                        {category}
                    </Typography>
                   
                </Box>
                <img src={image} alt={title} style={{ maxWidth: '90%', height: 'auto' , margin: "30px 0px", display: "flex",  justifyContent: "center", }} />
                <Typography variant="body1" gutterBottom>
                    Rating: {rating.rate} ({rating.count} reviews)
                </Typography>
                <Rating
                    name="half-rating-read"
                    value={rating.rate}
                    precision={0.5}
                    readOnly
                />
                <Typography variant="body1" gutterBottom style={{marginTop: "30px"}}>
                    Description: {description}
                </Typography>


            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="warning">
                    Close
                </Button>
                <Button onClick={handleClose} color="primary">
                    Buy now
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductModal;
