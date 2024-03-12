import { useState, createContext, useEffect } from 'react';
import { User, Auth } from "../api"
import { hasExpiredToken } from "../utils"

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Comprobar si hay un usuario logueado
        (async () => {
            const accessToken = authController.getAccessToken();    
            const refreshToken = authController.getRefreshToken();
            /* eslint-disable no-alert */
            if (!accessToken || !refreshToken) { 
                logout();
                setLoading(false);
                return;
            }
            /* eslint-disable no-alert */
            // if(hasExpiredToken(accessToken)) { //TODO: aqui está el erorr : Levanvartar el error en casa para el token que tengo en postman 
            //     if(hasExpiredToken(refreshToken)) {
            //         logout();
            //     } else {
            //       await reLogin(refreshToken);
            //     }
            // } else {
            //     await login(accessToken);
            // }
            setLoading(false);
        })();
    }, []);

    const reLogin = async (refreshToken) => {
        try {
            const { accessToken } = await authController.refreshAccessToken(refreshToken);      
            authController.setAccessToken(accessToken); 
            await login(accessToken);
        } catch (error) {
            console.log("Error", error);
        }

    }

    const login = async (accessToken) => {
       try {
        const response = await userController.getMe(accessToken);
        delete response.password;
        
        setUser(response);
        setToken(accessToken);
       } catch (error) {
        console.log("Error", error);
       }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        authController.removeTokens();
    }
    const data = {
        accessToken: token,
        user,
        login,
        logout,
    }

    if (loading ) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

