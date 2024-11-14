import { useState } from 'react'
import '../styles/ModalImage.css'
import { SiTicktick } from "react-icons/si";



export default function ModalImage({ photo, close }) {

  const [description, setDescription] = useState(photo.alt_description)
  const handleChange = (e) => {
    setDescription(e.target.value)
  }
  const handleSave = () => {
    close();
  }


  console.log(photo)
  return (
    <div className="modal-background">
      <div className="modal-content">
        <img src={photo.urls.regular} alt={photo.alt_description} />
        <div className='modal-content-area'>
          <textarea
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="modal-buttons">
        <SiTicktick className='cross' onClick={handleSave}/>
        </div>
      </div>
    </div>
  )
}
