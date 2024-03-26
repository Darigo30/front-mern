import { ENV } from "../utils"

export class User {
    baseApi = ENV.BASE_API

    async getMe(accessToken) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
            console.log("url en user", url)
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }

            const response = await fetch(url, params);

            const result = await response.json(); 
            
            if (response.status !== 201) {
                console.log("error")  
            }
            console.log("result en user", result) //me está devolviendo token invalido
            
            return result;

        } catch (error) {
            throw error;
        }
    }

    async createUser(accessToken, data) {
        try {
         const formData = new FormData();
         Object.keys(data).forEach(key => {
             formData.append(key, data[key]);
         });

         if(data.fileAvatar) {
                formData.append("avatar", data.fileAvatar);
         }   

         const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`; 
         const params = {
             method: "POST",
             headers: {
                 Authorization: `Bearer ${accessToken}`,
             },
             body: formData,
         };

         const response = await fetch(url, params);
         const result = await response.json();

         if (response.status !== 201) {
             throw result;
         }

         console.log("error en create user", error)

        } catch (error) {
            throw error;
        }
    }
    
}