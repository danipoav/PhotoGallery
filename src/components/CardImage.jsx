import { usePhotoApi } from "../hooks/usePhotosApi"
import '../styles/CardImage.css'
import { useSelector } from "react-redux";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { ImageContent, ImageContentFav } from "./ImageContent";



export default function CardImage() {

    const { photos } = usePhotoApi();
    const favourites = useSelector((state) => state.favourites.favourites)
    const showFavourites = useSelector((state) => state.favourites.showFavourites)
    const [order, setOrder] = useState('')

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

    return (
        <>
            <div className='card__select'>
                <select className="select" name="order" id="order" onChange={handleChangeOrder}>
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
                                <ImageContentFav key={photo.id} photo={photo} />
                            ))}
                        </div>
                    )
                : (
                    <div className="card-content">{orderPhotos(photos).map((photo) => {
                        return (
                            <ImageContent key={photo.id} photo={photo} />
                        )
                    })
                    }
                    </div>
                )
            }
            <ToastContainer limit={2} />
        </>


    )
}
