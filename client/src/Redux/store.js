import { configureStore } from "@reduxjs/toolkit";
import user from "./Reducer/UserSlice";
import panier from "./Reducer/panierSlice";



export const store = configureStore({
  reducer: {
    users: user,
    panier:panier
   
  },
});