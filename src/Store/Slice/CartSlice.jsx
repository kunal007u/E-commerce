import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItem: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
        cartTotalItemsCount: 0,
        cartTotalAmount: 0,
    },
    reducers: {
        addCart: (state, action) => {
            const itemIndex = state.cartItem.findIndex(
                (item) => item.id === action.payload.id
            )
            if (itemIndex >= 0) {
                state.cartItem[itemIndex].CartQuentity += 1
                {
                    action.payload.title ?
                        toast.info(`${action.payload.title} Increased successfully`, {
                            position: "top-right"
                        }) : toast.info(`Item added successfully`, {
                            position: "top-right"
                        })

                }
            }
            else {
                const TempProduct = { ...action.payload, CartQuentity: 1 }
                state.cartItem.push(TempProduct);
                {
                    action.payload.title ?
                        toast.info(`${action.payload.title} added successfully`, {
                            position: "top-right"
                        }) : toast.info(`Item added successfully`, {
                            position: "top-right"
                        })

                }

            }
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
        },

        removeFromCart: (state, action) => {
            const itemIndex = state.cartItem.findIndex(
                (item) => item.id === action.payload.id
            )
            if (state.cartItem[itemIndex].CartQuentity > 1) {
                state.cartItem[itemIndex].CartQuentity -= 1
            }
            else {

                const nextItem = state.cartItem.filter((item) => {
                    return item.id !== action.payload.id
                })

                toast.error(`${action.payload.title} removed successfully`, {
                    position: "top-right"
                }),
                    state.cartItem = nextItem;
            }
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
        },
        clearCart: (state, action) => {
            state.cartItem = []
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem))

        },
        subTotlal: (state, action) => {
            let { total, quentity } = state.cartItem.reduce(({ total, quentity }, { price, CartQuentity }) => {
                const itemTotal = price * CartQuentity

                total = total + itemTotal
                quentity = quentity + CartQuentity

                return {total,quentity}
            }, {
                total: 0,
                quentity: 0
            })

            state.cartTotalItemsCount = quentity
            state.cartTotalAmount = total
        }
    }
})

export default cartSlice.reducer;
export const { addCart, removeFromCart, clearCart,subTotlal } = cartSlice.actions;