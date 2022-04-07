import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    quantity:0

}

const panierSlice = createSlice({
  name: "panier",
  initialState,
  reducers: {
    addProduct:(state)=>{
        state.quantity += 1 ;
    },
  }
});

export const { addProduct } = panierSlice.actions


export default panierSlice.reducer