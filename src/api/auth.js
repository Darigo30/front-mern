import { ENV } from "../utils";

export class Auth {
    baseApi = ENV.BASE_API;

    async register(data){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            }

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async login(data) {
        console.log("data", data)
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }

            const response = await fetch(url, params);
            const result = await response.json(); //esto responde bien el acces token
            console.log("result en auth - funcion asincrona de login", result)

            if (response.status !== 200) throw result;
            
            return result;
        } catch (error) {
            throw error;
        }
    }

    async refreshAccessToken (refreshToken) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    token: refreshToken,
                 }),
            }

            const response = await fetch(url, params);
            const result = await response
            if (response.status !== 200) throw result;
            console.log("result", result)
            return result;
        } catch (error) {
            console.log("error", error)
        }
    }

    setAccessToken(token) {
        localStorage.setItem(ENV.JWT.ACCESS, token);
    }

    getAccessToken() {
        return localStorage.getItem(ENV.JWT.ACCESS);
    }

    setRefrehToken(token) {
        localStorage.setItem(ENV.JWT.REFRESH, token);
    }

    getRefreshToken() {
        return localStorage.getItem(ENV.JWT.REFRESH);
    }

    removeTokens() {
        localStorage.removeItem(ENV.JWT.ACCESS);
        localStorage.removeItem(ENV.JWT.REFRESH);
    }
}

