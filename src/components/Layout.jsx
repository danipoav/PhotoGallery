import '../styles/LayoutHeader.css';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeFavourites, handleSearchDescription } from '../reducers/favouriteSlice';
import { changeInput } from '../reducers/searchSlice';
import CardImage from './CardImage';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Layout() {

    const dispatch = useDispatch()
    const showFavourites = useSelector((state) => state.favourites.showFavourites)
    const navigate = useNavigate();

    const handleChangePage = () => {
        if (showFavourites) {
            navigate('/')
        } else {
            navigate('/myPhotos')
        }
        dispatch(handleChangeFavourites())
    }

    return (<>
        <header className='container'>
            <div className='container__navbar'>
                <p>Pixani</p>
                <button onClick={() => handleChangePage()} className={`container__navbar__button ${showFavourites ? 'myphotos' : ''}`}>
                    {showFavourites ? 'All photos' : 'My photos'}
                </button>

            </div>
            <div className='container__title'>
                {showFavourites ? <h1 className='title-favs'>My favourite images</h1> : <h1>All type of images to download</h1>}
            </div>
            {
                <div className='container__input'>
                    <FaSearch className='search-icon' />
                    <input onChange={(e) => showFavourites ? dispatch(handleSearchDescription(e.target.value)) : dispatch(changeInput(e.target.value))} type="text" placeholder={showFavourites ? 'Search descriptions...' : 'Search images...'} />
                </div>
            }

        </header >

        <CardImage />

        <footer className="footer__container">
            <h1 className="title">Pixani</h1>
            <div className="link__container">
                <a href="https://www.linkedin.com/in/danipoav/" target="_blank"><FaLinkedin className="link" /></a>
                <a href="https://github.com/danipoav" target="_blank"><FaGithub className="git" /></a>

            </div>
        </footer>
    </>
    )
}
