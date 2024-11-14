import LayoutHeader from "./components/layoutHeader"
import '../src/styles/global.css'
import CardImage from "./components/CardImage"
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


function App() {


  return (
    <>
      <LayoutHeader />
      <CardImage />
      <footer className="footer__container">
        <h1 className="title">Pixani</h1>
        <div className="link__container">
          <FaLinkedin className="link" />
          <FaGithub className="git" />
        </div>
      </footer>
    </>
  )
}

export default App
