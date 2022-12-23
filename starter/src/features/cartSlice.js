import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../data/cartItems";
import axios from "axios";

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems',
    async (name, thunkAPI) => {
        try {
            const url = 'https://course-api.com/react-useReducer-cart-project';
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    });

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        amount: 4,
        total: 0,
        isLoading: true
    },
    reducers: {
        clearCart: (state) =>{
            state.cartItems = [];
        },
        removeItem(state, {payload}){
            state.cartItems = state.cartItems.filter(item => item.id !== payload);
        },
        addAmount: (state, {payload}) => {
            state.cartItems.find(c => c.id === payload).amount = state.cartItems.find(c => c.id === payload).amount + 1;
        },
        subtractAmount: (state, {payload}) => {
            state.cartItems.find(c => c.id === payload).amount = Math.max(0, state.cartItems.find(c => c.id === payload).amount - 1)
        },
        calculateTotals(state){
            let amount = 0;
            let total = 0;
            state.cartItems.forEach(item =>{
                amount += item.amount;
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state, { payload }) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.cartItems = payload;
            })
            .addCase(fetchCartItems.rejected, (state, { payload }) => {
                state.isLoading = false;
            })

    }
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;