import { useContext, useEffect } from "react";
import { StrategyContext } from "../context/StrategyProvider";
import { useParams } from "react-router-dom";
import "../css/Homepage.css";
import "../css/FundsPage.css";

function FundsPageComponent() {
    const { allStrategies, userPortfolio, loadAllStrategies, loadUserPortfolio, getStrategyFromId } = useContext(StrategyContext);
    const { strategyId } = useParams();
    useEffect(() => {
        console.log("Hello");
        loadAllStrategies();
        loadUserPortfolio();
        console.log('allStrategies', allStrategies);
        console.log('userPortfolio', userPortfolio);
    }, []);



    const getInvestedValue = (strategy, fundName) => {
        let investedValue = 0;
        if(!userPortfolio?.strategyMap) {
            return investedValue;
        }
        const userPortfolioObj = userPortfolio.strategyMap[strategy.name];
        
        console.log("userPortfolioObj", userPortfolioObj);
        if (!userPortfolioObj) return investedValue.toFixed(2);
        if (fundName in userPortfolioObj) {
            investedValue = userPortfolioObj[fundName].investedValue;
        }
        return investedValue.toFixed(2);
    }

    const getMarketValue = (strategy, fundName) => {

        let marketValue = 0;
        if(!userPortfolio?.strategyMap) {
            return marketValue;
        }
        const userPortfolioObj = userPortfolio.strategyMap[strategy.name];
        
        console.log("userPortfolioObj", userPortfolioObj);
        if (!userPortfolioObj) return marketValue.toFixed(2);
        if (fundName in userPortfolioObj) {
            marketValue = userPortfolioObj[fundName].marketValue;
        }
        return marketValue.toFixed(2);
    }

    const renderFunds = (strategyId) => {
        const strategy = getStrategyFromId(strategyId);
        if (strategy) {
            const funds = strategy.funds;
            return (
                <>
                    {funds.map((fund, index) => {
                        const investedValue = getInvestedValue(strategy, fund.name);
                        const marketValue = getMarketValue(strategy, fund.name);
                        const userPortfolioObj = userPortfolio.strategyMap[strategy.name];
                        console.log("---->", userPortfolioObj);
                        return (
                            <>
                                <h3 key={`fund_${index}`}>{fund.name}</h3>
                                <div className="fund-card">
                                    <div className="value-container fund-value">
                                        <span>Invested Value</span>
                                        <span className="value">{investedValue}</span>
                                    </div>
                                    <div className="value-container fund-value">
                                        <span>Market Value</span>
                                        <span className="value">{marketValue}</span>
                                    </div>
                                </div>
                                {(investedValue < 1 || marketValue < 1) && userPortfolioObj && <div className="error">
                                        Failed order. Any amount deducted will be credited in few days.
                                    </div>}

                            </>
                        )
                    })}
                </>
            )
        }
    }

    return (
        <div className="funds-page">
            <div className="fund-title">
                <h2>{getStrategyFromId(strategyId)?.name || "Fund Strategy"}</h2>
            </div>

            <div className="fund-list">
                {renderFunds(strategyId)}
            </div>

            <span className = "note">Refresh to fetch latest update</span>

        </div>
    );
}

export default FundsPageComponent;