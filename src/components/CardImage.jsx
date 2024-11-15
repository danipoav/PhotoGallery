import { usePhotoApi } from "../hooks/usePhotosApi"
import { IoMdHeartEmpty } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import '../styles/CardImage.css'
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addFavourites, removeFavourites } from "../reducers/favouriteSlice";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import ModalImage from "./ModalImage";
import ImageContent from "./ImageContent";
import downloadFile from "../hooks/downloadFile";



export default function CardImage() {

    const dispatch = useDispatch();
    const { photos } = usePhotoApi();
    const favourites = useSelector((state) => state.favourites.favourites)
    const showFavourites = useSelector((state) => state.favourites.showFavourites)
    const [order, setOrder] = useState('')
    const [modal, setModal] = useState(false);

    const handleChangeOrder = (e) => {
        setOrder(e.target.value)
    }

    const orderPhotos = (photos) => {
        if (order === 'width') {
            return [...photos].sort((a, b) => b.width - a.width)
        } else if (order === 'height') {
            return [...photos].sort((a, b) => b.height - a.height)
        } else if (order === 'likes') {
            return [...photos].sort((a, b) => b.likes - a.likes)
        } else if (order === 'date') {
            return [...photos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }
        return [...photos]
    }

    const handleOpenModal = (photo) => {
        setModal({ open: true, photo })
    }

    const handleCloseModal = () => {
        setModal({ open: false, photos: null })
    }

    return (
        <>
            <div className='card__select'>
                <select name="order" id="order" onChange={handleChangeOrder}>
                    <option value="">Order by</option>
                    <option value="width">Width</option>
                    <option value="height">Height</option>
                    <option value="likes">Likes</option>
                    <option value="date">Date</option>
                </select>
            </div>
            {showFavourites ?
                favourites.length === 0 ?
                    (<div className="card-favourites">
                        <h1 className="title">You don't have favorite images yet</h1>
                    </div>)
                    : (
                        <div className="card-content">
                            {orderPhotos(favourites).map((photo) => (
                                <ImageContent key={photo.id} photo={photo}>
                                    <div className="card-data">
                                        <p>W {photo.width} </p>
                                        <p>H {photo.height} </p>
                                        <p><IoMdHeartEmpty /> {photo.likes} </p>
                                        <p>{new Date(photo.created_at).toLocaleDateString('en-US')}</p>
                                    </div>
                                    <div className="card-buttons">
                                        <HiPencilAlt className="description" onClick={() => handleOpenModal(photo)} />
                                        <FiDownload className="download" onClick={() => downloadFile(photo.urls.regular, photo.slug)} />
                                        <MdDeleteOutline className="delete" onClick={() => dispatch(removeFavourites(photo))} />
                                    </div>
                                </ImageContent>
                            ))}
                        </div>
                    )
                : (
                    <div className="card-content">{orderPhotos(photos).map((photo) => (
                        <ImageContent key={photo.id} photo={photo}>
                            <div className="card-buttons">
                                <FiDownload className="download" onClick={() => downloadFile(photo.links.download, photo.slug)} />
                                <IoMdHeartEmpty className="heart" onClick={() => dispatch(addFavourites(photo))} />
                            </div>
                        </ImageContent>
                    ))
                    }
                    </div>
                )
            }
            {modal.open ? <ModalImage photo={modal.photo} close={handleCloseModal} /> : null}
            <ToastContainer limit={2} />
        </>


    )
}
