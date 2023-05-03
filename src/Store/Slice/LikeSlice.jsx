
import { createSlice } from '@reduxjs/toolkit';

const likeSlice = createSlice({
    name: "like",
    initialState: {
        likeItem: localStorage.getItem('like') ? JSON.parse(localStorage.getItem('like')) : [],
        likedProducts: []
    },
    reducers: {
        addLike: (state, action) => {

            const existingProduct = state.likeItem.find((product) => {
                return product.id === action.payload.id
            })
            console.log(existingProduct);
            if (!existingProduct) {

                const tempLikeitem = { ...action.payload, like: false }
                state.likeItem.push(tempLikeitem)
                localStorage.setItem("like", JSON.stringify(state.likeItem))

            }
            else {
                state.likeItem = state.likeItem.filter(
                    product => product.id !== action.payload.id
                );
                localStorage.setItem("like", JSON.stringify(state.likeItem));
            }

        },
        likedproduct: (state, action) => {
            state.likedProducts = action.payload
        },
        removeLikeItem: (state, action) => {
            const productIdToRemove = action.payload.id;
            const updatedProducts = state.likeItem.filter(product => product.id !== productIdToRemove);
            state.likeItem = updatedProducts;
        }
    },




})

export default likeSlice.reducer;
export const { addLike, likedproduct, removeLikeItem } = likeSlice.actions;