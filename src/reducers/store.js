import { configureStore } from "@reduxjs/toolkit";
import favouriteSlice from "./favouriteSlice";
import searchSlice from "./searchSlice";

export const store = configureStore({
    reducer: {
        favourites: favouriteSlice,
        search: searchSlice
    }
})