import NavButtonText from "../navButtonText/NavButtonText";
import "./navbar.css"
const NavBar = () => {
    
    return (
        <>
            <div className="navbar">   
                <NavButtonText name={"/home"} text={"Home"} ></NavButtonText>
                <NavButtonText name={"/myevents"} text={"My events"} ></NavButtonText>
                <NavButtonText name={"/mylocations"} text={"My locations"} ></NavButtonText>
            </div>

        </>
    )
}
//                <ButtonText name={"/persona/:id"} text={"Persona"} ></ButtonText>
export default NavBar