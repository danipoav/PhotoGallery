import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                toast.success("Photo added successfully", { autoClose: 1500, theme: "dark", position: "bottom-right", transition: Slide });
                state.favourites = [...state.favourites, action.payload];
                localStorage.setItem('favourites', JSON.stringify(state.favourites))
            }
        },
        removeFavourites: (state, action) => {
            const newArray = state.favourites.filter(photo => photo.id !== action.payload.id)
            toast.error('Photo deleted successfully', { autoClose: 1500, theme: 'dark', position: "bottom-right", transition: Slide })
            state.favourites = newArray
            localStorage.setItem('favourites', JSON.stringify(state.favourites))
        },
        handleSearchDescription: (state, action) => {
            const searchInput = action.payload.toLowerCase();

            if (action.payload === '') {
                state.favourites = getFavouritesLocalStorage()
            } else {
                state.favourites = state.favourites.filter(photo => {
                    if (photo.description) {
                        return photo.description.toLowerCase().includes(searchInput);
                    }
                    return;
                });
            }
        }
    }
});

export const { handleChangeFavourites, addFavourites, removeFavourites, handleSearchDescription } = favouriteSlice.actions;
export default favouriteSlice.reducer;
