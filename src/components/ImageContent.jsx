
export default function ImageContent({ photo, children }) {
    return (

        <div className={`card-image ${photo.width > photo.height ? 'wide' : ''}`}>
            <div className={`card-image-content`} >
                <img src={photo.urls.regular} alt={photo.alt_description} />
                {children}
            </div>
        </div>
    )
}
