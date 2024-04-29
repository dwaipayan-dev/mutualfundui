import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import LoginPageComponent from "./LoginPage";
import HomePageComponent from "./HomePage";
import { Route, Router, Routes } from "react-router-dom";
import FundsPageComponent from "./FundsPage";
import NotFoundPageComponent from "./NotFoundPage";

import PaymentPageComponent from "./PaymentPage";

import "../css/Layout.css";
import PaymentStatusPageComponent from "./PaymentStatusPage";

function LayoutComponent() {
    const {user, setUser} = useContext(AuthContext);
    return ( 
        <>
            {!user && <LoginPageComponent />}
            {user && 
            <>
            <div className="header">
                <h4>Hi {user}</h4>
            </div>
            <Routes>
                <Route path="/" element = {<HomePageComponent/>} />
                <Route path="/funds/:strategyId" element = {<FundsPageComponent/>} />
                <Route path="/payment" element = {<PaymentPageComponent/>} />
                <Route path="/payment-status" element = {<PaymentStatusPageComponent/>}/>
                <Route path="/*" element = {<NotFoundPageComponent/>} />
            </Routes>
            </>
            }
            
        </>
     );
}

export default LayoutComponent;