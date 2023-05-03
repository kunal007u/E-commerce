import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'categories/fetchProduct',
    async (url, thunkAPI) => {
        try {
            const { data } = await axios.get(url);
            return data; // this data will be take as a payload directlty by reducer 
        } catch (error) {
            // Use rejectWithValue to dispatch the error message along with the action
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        productsData: [],
        productsDataCopy: []
    },

    reducers: {
        updateProductList: (state, action) => {
            console.log(action.payload);
            const ClickedCategory = state.productsDataCopy.filter((product) => {
                return product.category === action.payload
            })
            if (ClickedCategory === undefined) {
                console.log("null clicked category");
            }
            else {
                state.productsData = ClickedCategory;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                // Handle pending state if needed
                console.log("pending data ");
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsData = action.payload;
                state.productsDataCopy = action.payload;
            })

            .addMatcher(
                (action) =>
                    action.type.endsWith('/rejected') &&
                    (action.type.includes(fetchProducts.typePrefix)),
                (state, action) => {
                    // Use serializeError to handle non-serializable values in the error action
                    state.productsData = [];
                    console.error('Failed to fetch products:', action.payload);
                }
            )
    },
});

export default productSlice.reducer;
export const { updateProductList } = productSlice.actions