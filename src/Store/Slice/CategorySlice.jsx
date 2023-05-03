import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// used for fetching the category data 
export const fetchCategory = createAsyncThunk(
    'categories/fetchCategory',
    async (url, thunkAPI) => {
        try {
            const { data } = await axios.get(url);
            return data;
        } catch (error) {
            // Use rejectWithValue to dispatch the error message along with the action
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// used for fetching the product data 

const categorySlice = createSlice({
    name: 'categories',
    initialState: {  categoriesData: {} },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                console.log("pending data ");
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.categoriesData = action.payload;
            })

            .addMatcher(
                (action) =>
                    action.type.endsWith('/rejected') &&
                    (action.type.includes(fetchCategory.typePrefix)),
                (state, action) => {
                    // Use serializeError to handle non-serializable values in the error action
                    state.categoriesData = [];
                    console.error('Failed to fetch categories and products:', action.payload);
                }
            )
    },
});

export default categorySlice.reducer;
