import { IoMdHeartEmpty } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import downloadFile from "../hooks/downloadFile";
import { FiDownload } from "react-icons/fi";
import { addFavourites, removeFavourites } from "../reducers/favouriteSlice";
import { HiPencilAlt } from "react-icons/hi";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import ModalImage from "./ModalImage";



export function ImageContent({ photo }) {

    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favourites.favourites)
    const isFavourite = favourites.some(item => item.id === photo.id);

    const handleChangeHeart = (photo) => {
        const isFavourite = favourites.some(item => item.id === photo.id);
        if (isFavourite) {
            dispatch(removeFavourites(photo));
        } else {
            dispatch(addFavourites(photo));
        }
    };

    return (
        <div className={`card-image ${photo.width > photo.height ? 'wide' : ''}`}>
            <div className={`card-image-content`} >
                <img src={photo.urls.regular} alt={photo.alt_description} />
                <div className="card-buttons">
                    <FiDownload className="download" onClick={() => downloadFile(photo.links.download, photo.slug)} />
                    <IoMdHeartEmpty className={`heart ${isFavourite ? 'true' : ''}`} onClick={() => handleChangeHeart(photo)} />
                </div>
            </div>
        </div>
    )
}

export function ImageContentFav({ photo }) {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favourites.favourites)
    const isFavourite = favourites.some(item => item.id === photo.id);

    const handleChangeHeart = (photo) => {
        const isFavourite = favourites.some(item => item.id === photo.id);
        if (isFavourite) {
            dispatch(removeFavourites(photo));
        } else {
            dispatch(addFavourites(photo));
        }
    };

    const handleOpenModal = (photo) => {
        setModal({ open: true, photo })
    }

    const handleCloseModal = () => {
        setModal({ open: false, photos: null })
    }

    return (
        <div className={`card-image ${photo.width > photo.height ? 'wide' : ''}`}>
            <div className={`card-image-content`} >
                <img src={photo.urls.regular} alt={photo.alt_description} />
                <div className="card-data">
                    <p>W {photo.width} </p>
                    <p>H {photo.height} </p>
                    <p><IoMdHeartEmpty /> {photo.likes} </p>
                    <p>{new Date(photo.created_at).toLocaleDateString('en-US')}</p>
                </div>
                <div className="card-buttons">
                    <HiPencilAlt className="description" onClick={() => handleOpenModal(photo)} />
                    <FiDownload className="download" onClick={() => downloadFile(photo.urls.regular, photo.slug)} />
                    <MdDeleteOutline className="delete" onClick={() => handleChangeHeart(photo)} />
                </div>
            </div>
            {modal.open ? <ModalImage photo={modal.photo} close={handleCloseModal} /> : null}
        </div>
    )

}
