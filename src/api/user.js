import { ENV } from "../utils"

export class User {
    baseApi = ENV.BASE_API

    async getMe(accessToken) {
        try {
            const url = `{this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            const response = await fetch(url, params);
            const result = await response; // no funciona con .json()
            console.log("response", response)
            if (response.status !== 200) {
                console.log("error")  
            }
            return result;

        } catch (error) {
            throw error;
        }
    }
}