import { ENV } from "../utils"

export class User {
    baseApi = ENV.BASE_API

    async getMe(accessToken) {
        try {
            //const url = `{this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
            console.log("url en user", url)
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }

            const response = await fetch(url, params);

            const result = await response.json(); 
            
            if (response.status !== 200) {
                console.log("error")  
            }
            console.log("result en user", result) //me está devolviendo token invalido
            
            return result;

        } catch (error) {
            throw error;
        }
    }

    
}