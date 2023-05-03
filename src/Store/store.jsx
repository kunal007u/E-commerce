// NOTE :- Create a Redux Store

import { configureStore } from '@reduxjs/toolkit'
import CategorySlice from '/src/Store/Slice/CategorySlice'
import ProductSlice from '/src/Store/Slice/ProductSlice'
import CartSlice from '/src/Store/Slice/CartSlice'
import LikeSlice from '/src/Store/Slice/LikeSlice'
import SignupSlice from '/src/Store/Slice/SignupSlice'
export const store = configureStore({
    reducer: {
        CategorySlice,ProductSlice,CartSlice,LikeSlice,SignupSlice
    },
})