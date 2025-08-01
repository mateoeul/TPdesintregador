import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    return (
        <h1>register</h1>
    );
}
export default Register;