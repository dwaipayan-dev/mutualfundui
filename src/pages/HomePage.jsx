import { useContext, useEffect } from "react";
import { StrategyContext } from "../context/StrategyProvider";
import { useNavigate } from "react-router-dom";

import "../css/Homepage.css"

function HomePageComponent() {
    const { allStrategies, userPortfolio, loadAllStrategies, loadUserPortfolio } = useContext(StrategyContext);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Hello");
        loadAllStrategies();
        loadUserPortfolio();
        console.log('allStrategies', allStrategies);
        console.log('userPortfolio', userPortfolio);
    }, []);

    const getTotalInvestedValue = (strategyName) => {
        const userPortfolioObj = userPortfolio.strategyMap;
        let totalInvestedAmount = 0;
        if (strategyName in userPortfolioObj) {
            const strategyObj = userPortfolioObj[strategyName]
            for (let fund in strategyObj) {
                totalInvestedAmount += strategyObj[fund].investedValue;
            }
        }
        return totalInvestedAmount.toFixed(2);
    }

    const getTotalMarketValue = (strategyName) => {
        const userPortfolioObj = userPortfolio.strategyMap;
        let totalMarketValueAmount = 0;
        if (strategyName in userPortfolioObj) {
            const strategyObj = userPortfolioObj[strategyName]
            for (let fund in strategyObj) {
                totalMarketValueAmount += strategyObj[fund].marketValue;
            }
        }
        return totalMarketValueAmount.toFixed(2);
    }


    const renderStrategies = () => {
        return (
            <div className="strategy-container">

                {allStrategies.length > 0 && allStrategies.map((item, index) => {
                    return (
                        <div className="strategy-card" key={`strategy-item-${index}`}>
                            <h2>{item.name}</h2>
                            <div className="strategy-card-body">
                                <div className="value-container">
                                    <span>Invested Value</span>
                                    <span className="value">{getTotalInvestedValue(item.name)}</span>
                                </div>
                                <div className="value-container">
                                    <span>Market Value</span>
                                    <span className="value">{getTotalMarketValue(item.name)}</span>
                                </div>
                                <button className="go-to-holdings" onClick={() => {
                                        navigate(`/funds/${item.id}`)
                                    }}>See holdings</button>
                            </div>


                        </div>
                    )
                })
                }
            </div>
        )
    }
    return (

        <div className="home-page">
            <h1>Strategies</h1>
            {renderStrategies()}
            <div className="transact-btn-container">
            <button className = "go-to-holdings transact-btn" onClick={() => navigate('/payment')}>Transact</button>
            </div>
            <span className = "note">Refresh to fetch latest update</span>
        </div>
    );
}

export default HomePageComponent;