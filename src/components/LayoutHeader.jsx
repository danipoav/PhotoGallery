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
                <p>LOGO</p>
                <button onClick={() => dispatch(handleChangeFavourites())} className='container__navbar__button'>
                    {showFavourites ? 'All photos' : 'My photos'}
                </button>

            </div>
            <div className='container__title'>
                <h1>{showFavourites ? 'All my favourite images' : 'All type of images to download'}</h1>
            </div>
            {showFavourites ? false : (<div className='container__input'>
                <FaSearch className='search-icon' />
                <input onChange={(e) => dispatch(changeInput(e.target.value))} type="text" placeholder={showFavourites ? 'Search in my favourite images...' : 'Search images...'} />
            </div>)}

        </header>
    )
}
