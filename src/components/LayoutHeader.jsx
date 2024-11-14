import '../styles/LayoutHeader.css';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeFavourites } from '../reducers/favouriteSlice';
import { changeInput } from '../reducers/searchSlice';

export default function LayoutHeader() {

    const dispatch = useDispatch()
    const showFavourites = useSelector((state) => state.favourites.showFavourites)

    return (
        <header className='container'>
            <div className='container__navbar'>
                <p>Pixani</p>
                <button onClick={() => dispatch(handleChangeFavourites())} className='container__navbar__button'>
                    {showFavourites ? 'All photos' : 'My photos'}
                </button>

            </div>
            <div className='container__title'>
                {showFavourites ? <h1 className='title-favs'>My favourite images</h1> : <h1>All type of images to download</h1>}
            </div>
            {showFavourites ? false : (<div className='container__input'>
                <FaSearch className='search-icon' />
                <input onChange={(e) => dispatch(changeInput(e.target.value))} type="text" placeholder={showFavourites ? 'Search in my favourite images...' : 'Search images...'} />
            </div>)}

        </header>
    )
}
