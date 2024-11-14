import { createSlice } from "@reduxjs/toolkit";

const getFavouritesLocalStorage = () => {
    const savedPhotos = localStorage.getItem('favourites')
    return savedPhotos ? JSON.parse(savedPhotos) : [];
}

const initialState = {
    favourites: getFavouritesLocalStorage(),
    showFavourites: false
};

export const favouriteSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        handleChangeFavourites: (state) => {
            state.showFavourites = !state.showFavourites;
        },
        addFavourites: (state, action) => {
            const exists = state.favourites.some(photo => photo.id === action.payload.id)

            if (!exists) {
                state.favourites = [...state.favourites, action.payload];
                localStorage.setItem('favourites', JSON.stringify(state.favourites))
            }
        },
        removeFavourites: (state, action) => {
            const newArray = state.favourites.filter(photo => photo.id !== action.payload.id)
            state.favourites = newArray
            localStorage.setItem('favourites', JSON.stringify(state.favourites))
        }
    }
});

export const { handleChangeFavourites, addFavourites, removeFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
