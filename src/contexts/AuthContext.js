import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();


export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        //Comprobar si hay un usuario logueado
    }, []);


    const login = async (accessToken) => {
       try {
        setUser({username: "dari"});
        setToken(accessToken);
        console.log("AccesoToken", accessToken)
       } catch (error) {
        console.log("Error", error)
       }
    }

    const data = {
        accessToken: token,
        user,
        login,
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

