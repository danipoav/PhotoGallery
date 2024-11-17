import '../src/styles/global.css'
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />} />
            <Route path='/myPhotos' element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
