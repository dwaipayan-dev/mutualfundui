import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export const StrategyContext = createContext();

function StrategyProvider({children}) {
    const {user, setUser} = useContext(AuthContext);
    const [allStrategies, setAllStrategies] = useState([]);
    const [userPortfolio, setUserPortfolio] = useState({});

    const [serverError, setServerError] = useState(null);

    const getStrategyFromId = (strategyId) => {
        console.log("allStrategies", allStrategies);
        if(allStrategies.length > 0) {
            for(let strategy  of allStrategies){
                if(strategy.id === parseInt(strategyId)){
                    return strategy;
                }
            }
        }
        return null;
    }

    const loadAllStrategies = async () => {
        // const strategyResponse = [
        //     {
        //         "id": 1,
        //         "createdDate": "2024-04-29T04:07:56.463+00:00",
        //         "updatedDate": "2024-04-29T04:07:56.463+00:00",
        //         "name": "Arbitrage Strategy",
        //         "description": "This strategy is based on the concept of arbitrage. It is a trading strategy that profits by exploiting the price differences of identical or similar financial instruments on different markets or in different forms. This strategy is based on the concept of arbitrage. It is a trading strategy that profits by exploiting the price differences of identical or similar financial instruments on different markets or in different forms.",
        //         "funds": [
        //             {
        //                 "id": 2,
        //                 "createdDate": "2024-04-29T04:07:56.480+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.480+00:00",
        //                 "name": "Arbitrage Fund 1",
        //                 "percentage": 10
        //             },
        //             {
        //                 "id": 3,
        //                 "createdDate": "2024-04-29T04:07:56.481+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.481+00:00",
        //                 "name": "Arbitrage Fund 2",
        //                 "percentage": 20
        //             },
        //             {
        //                 "id": 4,
        //                 "createdDate": "2024-04-29T04:07:56.482+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.482+00:00",
        //                 "name": "Arbitrage Fund 3",
        //                 "percentage": 30
        //             },
        //             {
        //                 "id": 5,
        //                 "createdDate": "2024-04-29T04:07:56.482+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.482+00:00",
        //                 "name": "Arbitrage Fund 4",
        //                 "percentage": 40
        //             }
        //         ]
        //     },
        //     {
        //         "id": 6,
        //         "createdDate": "2024-04-29T04:07:56.483+00:00",
        //         "updatedDate": "2024-04-29T04:07:56.483+00:00",
        //         "name": "Balanced Strategy",
        //         "description": "This strategy is based on the concept of balanced portfolio. It is a trading strategy that profits by exploiting the price differences of identical or similar financial instruments on different markets or in different forms. This strategy is based on the concept of balanced portfolio. It is a trading strategy that profits by exploiting the price differences of identical or similar financial instruments on different markets or in different forms.",
        //         "funds": [
        //             {
        //                 "id": 7,
        //                 "createdDate": "2024-04-29T04:07:56.483+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.483+00:00",
        //                 "name": "Balanced Fund 1",
        //                 "percentage": 20
        //             },
        //             {
        //                 "id": 8,
        //                 "createdDate": "2024-04-29T04:07:56.483+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.483+00:00",
        //                 "name": "Balanced Fund 2",
        //                 "percentage": 20
        //             },
        //             {
        //                 "id": 9,
        //                 "createdDate": "2024-04-29T04:07:56.484+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.484+00:00",
        //                 "name": "Balanced Fund 3",
        //                 "percentage": 5
        //             },
        //             {
        //                 "id": 10,
        //                 "createdDate": "2024-04-29T04:07:56.484+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.484+00:00",
        //                 "name": "Balanced Fund 4",
        //                 "percentage": 40
        //             },
        //             {
        //                 "id": 11,
        //                 "createdDate": "2024-04-29T04:07:56.485+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.485+00:00",
        //                 "name": "Balanced Fund 5",
        //                 "percentage": 15
        //             }
        //         ]
        //     },
        //     {
        //         "id": 12,
        //         "createdDate": "2024-04-29T04:07:56.486+00:00",
        //         "updatedDate": "2024-04-29T04:07:56.486+00:00",
        //         "name": "Growth Strategy",
        //         "description": "This strategy is based on the concept of growth portfolio. It is a trading strategy that profits by exploiting the price differences of identical or similar financial instruments on different markets or in different forms. This strategy is based on the concept of growth portfolio. It is a trading strategy that profits by exploiting the price differences of identical or similar financial instruments on different markets or in different forms.",
        //         "funds": [
        //             {
        //                 "id": 13,
        //                 "createdDate": "2024-04-29T04:07:56.486+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.486+00:00",
        //                 "name": "Growth Fund 1",
        //                 "percentage": 50
        //             },
        //             {
        //                 "id": 14,
        //                 "createdDate": "2024-04-29T04:07:56.486+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.486+00:00",
        //                 "name": "Growth Fund 2",
        //                 "percentage": 10
        //             },
        //             {
        //                 "id": 15,
        //                 "createdDate": "2024-04-29T04:07:56.487+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.487+00:00",
        //                 "name": "Growth Fund 3",
        //                 "percentage": 10
        //             },
        //             {
        //                 "id": 16,
        //                 "createdDate": "2024-04-29T04:07:56.487+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.487+00:00",
        //                 "name": "Growth Fund 4",
        //                 "percentage": 15
        //             },
        //             {
        //                 "id": 17,
        //                 "createdDate": "2024-04-29T04:07:56.488+00:00",
        //                 "updatedDate": "2024-04-29T04:07:56.488+00:00",
        //                 "name": "Growth Fund 5",
        //                 "percentage": 15
        //             }
        //         ]
        //     }
        // ];
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/api/fund-strategy/fetch-all`,
            headers: { 
              'phoneNumber': `${user}`, 
            }
          };
        
        try {
            const strategyResponse = await axios(config);
            console.log(strategyResponse.data);
            setAllStrategies(strategyResponse.data);
        } catch (error) {
            console.error("Failed to fetch strategies due to ", error.message);
        }
    }

    const loadUserPortfolio = async () => {

        // const portfolioResponse = {
        //     "strategyMap": {
        //         "Arbitrage Strategy": {
        //             "Arbitrage Fund 1": {
        //                 "name": "Arbitrage Fund 1",
        //                 "count": 1,
        //                 "failedCount": 0,
        //                 "investedValue": 200,
        //                 "marketValue": 108.75119190177477
        //             },
        //             "Arbitrage Fund 2": {
        //                 "name": "Arbitrage Fund 2",
        //                 "count": 1,
        //                 "failedCount": 0,
        //                 "investedValue": 400,
        //                 "marketValue": 201.2547865455102
        //             },
        //             "Arbitrage Fund 3": {
        //                 "name": "Arbitrage Fund 3",
        //                 "count": 1,
        //                 "failedCount": 0,
        //                 "investedValue": 600,
        //                 "marketValue": 608.2855416338984
        //             },
        //             "Arbitrage Fund 4": {
        //                 "name": "Arbitrage Fund 4",
        //                 "count": 1,
        //                 "failedCount": 0,
        //                 "investedValue": 800,
        //                 "marketValue": 678.5953531374793
        //             }
        //         }
        //     },
        //     "totalInvestedAmount": 2000,
        //     "totalMarketValue": 1596.8868732186627,
        //     "message": null,
        //     "success": false
        // };
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/api/orders/getPortfolio`,
            headers: { 
              'phoneNumber': `${user}`, 
            },
          };
        try {
            const portfolioResponse = await axios(config);
            console.log(portfolioResponse.data)
            setUserPortfolio(portfolioResponse.data);
        } catch (error) {
            console.error("Failed to fetch portfolio due to ", error.message);
        }
    }

    useEffect(() => {

    }, [])

    return ( 
        <StrategyContext.Provider value = {{allStrategies, setAllStrategies, loadAllStrategies, loadUserPortfolio, userPortfolio, setUserPortfolio, getStrategyFromId}}>
            {children}
        </StrategyContext.Provider>
     );
}

export default StrategyProvider
;