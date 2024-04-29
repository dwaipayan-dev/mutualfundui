import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import "../css/LoginPage.css";
function LoginPageComponent() {
    const [phoneNumber, setPhoneNumber] = useState();
    const {user, setUser} = useContext(AuthContext);
    return ( 
        <div className="login-page-card">
            <div className="login-page-title">
                <h2>Login with Phonenumber</h2>
            </div>
            <div className="login-phonenumber-container">
                <input type="text" className="login-phone-number" onInput={(event) => {setPhoneNumber(event.target.value)}}/>
                <button className="login-button" onClick = {() => {
                    localStorage.setItem("user", phoneNumber);
                    setUser(localStorage.getItem('user'));
                    }}>
                    Login
                </button>
            </div>

            
        </div>
     );
}

export default LoginPageComponent;