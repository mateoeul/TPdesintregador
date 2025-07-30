import NavButtonText from "../../components/navButtonText/NavButtonText";
import "./Landing.css";
const Landing = () => {
    return (
        <div className="landing-container">
            <h1 className="landing-title">Bienvenido a Eventos</h1>
            <p className="landing-desc">Gestioná y descubrí eventos de manera fácil y rápida.</p>
            <div className="landing-buttons">
                <NavButtonText name={"/login"} text={"Login"} />
                <NavButtonText name={"/register"} text={"Register"} />
            </div>
        </div>
    );
}
export default Landing;