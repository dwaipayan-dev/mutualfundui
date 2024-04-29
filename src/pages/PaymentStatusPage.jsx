import { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import "../css/PaymentStatusPage.css"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

function PaymentStatusPageComponent() {
    const [isLoading, setIsLoading] = useState(true);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const paymentCall = async () => {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/api/payment-gateway/confirm-payment`,
            headers: {
                'phoneNumber': `${user}`,
            }
        };

        const paymentStatusResponse = await axios(config);
        if(paymentStatusResponse.data === true) {
            setIsLoading(false);
            setPaymentSuccess(true);
        } else {
            setIsLoading(false);
            setPaymentSuccess(false);
        }


    }

    useEffect(() => {
        if(paymentSuccess === false)
            paymentCall();
    }, [])
    return (
        <div className="payment-status-page">
            {isLoading && <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />}
            {!isLoading && paymentSuccess &&
                <div className="card">
                    <h1>Investment Successful</h1>
                    <div className="card-body">
                        <button className="go-to-holdings" onClick={() => {
                            navigate("/")
                        }}>Continue</button>
                    </div>
                </div>
            }
            {!isLoading && !paymentSuccess &&
                <div className="card">
                    <h1>Investment Failed</h1>
                    <div className="card-body">
                        <button className="go-to-holdings" onClick={() => {
                            navigate("/")
                        }}>Go to home</button>
                        <button className="go-to-holdings" style={{ marginLeft: '20px' }} onClick={() => {
                            setIsLoading(true);
                            paymentCall()
                        }}>Retry</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default PaymentStatusPageComponent;