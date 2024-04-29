import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(()=> {
        const user = localStorage.getItem("user");
        if(user) {
            setUser(parseInt(user));
        }
    }, [])
    return ( 
        <AuthContext.Provider value = {{user, setUser}}>
            {children}
        </AuthContext.Provider>
     );
}

export default AuthProvider;