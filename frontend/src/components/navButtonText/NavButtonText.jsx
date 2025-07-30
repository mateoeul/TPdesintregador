import { Link } from "react-router-dom";
import "./navButtonText.css"

const navButtonText = ({name, text}) =>{

    return <Link to={name}> <h1>{text}</h1></Link>
}

export default navButtonText