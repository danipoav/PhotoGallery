import { useEffect, useState } from 'react'
import '../styles/ModalImage.css'
import { SiTicktick } from "react-icons/si";
import { RxCrossCircled } from "react-icons/rx";



export default function ModalImage({ photo, close }) {

  const [description, setDescription] = useState(photo.alt_description)
  const handleChange = (e) => {
    setDescription(e.target.value)
  }
  const handleSave = () => {
    localStorage.setItem(`description-${photo.id}`, description)
    close();
  }

  useEffect(() => {
    const storage = localStorage.getItem(`description-${photo.id}`)
    if (storage) {
      setDescription(storage)
    }
  }, [photo.id])


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
          <div className="modal-buttons">
            <RxCrossCircled className='cross' onClick={close} />
            <SiTicktick className='done' onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  )
}
