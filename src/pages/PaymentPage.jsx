import { useContext, useEffect, useState } from "react";
import { StrategyContext } from "../context/StrategyProvider";
import { useNavigate } from "react-router-dom";
import "../css/PaymentPage.css"
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

function PaymentPageComponent() {
    const {allStrategies, userPortfolio, loadAllStrategies, loadUserPortfolio, getStrategyFromId} = useContext(StrategyContext);
    const {user, setUser} = useContext(AuthContext);
    const [strategy, setStrategy] = useState(null);
    const [amount, setAmount] = useState(0);
    const [accNo, setAccNo] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [ifscCode, setIfscCode] = useState("")
    const navigate = useNavigate();

    const validateInput = () => {
        if(amount > 0 && accNo && ifscCode) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }

    useEffect(()=> {
        if(allStrategies.length > 0){
            console.log("Select value",  allStrategies[0].id);
            setStrategy(allStrategies[0].id);
        } else {
            navigate('/');
        }
    }, [])

    useEffect(()=> {
        validateInput()
    }, [amount, accNo, ifscCode])

    const renderStrategySelect = () => {
        if(allStrategies.length > 0) {
            const strategies =  allStrategies.map((strategy)=> {
                return {name: strategy.name,  id: strategy.id};
            })
            return (
                <select className = "form-input strategy-select" id="select-strategy" name="strategySelection" onChange = {(event) => {
                    console.log("Select value", event.target.value);
                    setStrategy(event.target.value);
                }}>
                    {strategies.map((option, index) => {
                        return  <option key={`option-${index}`} value = {option.id}>{option.name}</option>
                    })}
                </select>
            )
        }
    }

    const renderFundSplit = (strategyId) => {
        console.log("StrategyId", strategyId);
        if(allStrategies.length > 0) {
            const strategyObj = getStrategyFromId(strategyId);
            console.log("strategyObj", strategyObj);
            return (
                <>  
                    {strategyObj["funds"].map((fund, index) => {
                        return(<div className="form-group" key = {`fund-split-${index}`}>
                        <div className="form-control">
                            <span className="fund-split-label"><h3>{fund.name}:</h3></span>
                            <div className="fund-value-payment">{parseInt(fund.percentage) * 0.01 * amount}</div>
                        </div>
                    </div>)
                    })}
                </>
            )
        } else {
            console.log("Hello")
        }
    }

    const handlePayment = async() => {

        let data = JSON.stringify({
            "productId": `${strategy}`,
            "amount": `${amount}`,
            "accountNumber": `${accNo}`,
            "ifscCode": `${ifscCode}`,
            "redirectUrl": `${process.env.REACT_APP_BASE_URL}/payment-status`
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/api/payment-gateway/link`,
            headers: { 
              'phoneNumber': `${user}`, 
              'Content-Type': 'application/json', 
            },
            data : data
          };

          const paymentLinkResponse = (await axios(config)).data;
          window.location.href = paymentLinkResponse.paymentLink;

    }
    return ( 
        <>
        <div className="form-group">
            <div className="form-control">
                <input className="form-input" type="number" placeholder="Enter amount" onChange = {(event) => {
                    setAmount(event.target.value);
                }}/>
            </div>
        </div>
        <div className="form-group">
            <div className="form-control">
                <input className="form-input" type="text" placeholder="Enter Acc/No." onChange = {(event) => {
                    setAccNo(event.target.value);
                }}/>
            </div>
        </div>
        <div className="form-group">
            <div className="form-control">
                <input className="form-input" type="text" placeholder="Enter IFSC Code" onChange = {(event) => {
                    setIfscCode(event.target.value);
                }}/>
            </div>
        </div>
        <div className="payment-page">
            {renderStrategySelect()}
        </div>

        <div>
            {strategy && renderFundSplit(strategy)}
        </div>

        <div className="form-group">
            <button className={`go-to-holdings ${isDisabled? "disabled-btn": ""}`} onClick = {() => 
                {handlePayment()}} disabled = {isDisabled}>
                INVEST
            </button>
        </div>
        </>
     );
}

export default PaymentPageComponent;