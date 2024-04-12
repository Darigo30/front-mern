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

         if(data?.fileAvatar && data?.avatar === "" || data?.avatar === undefined) {
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
         console.log("result en create user", result)

         if (response.status !== 201) throw result;
         
         console.log("error en create user", error)

        } catch (error) {
            throw error;
        }
    }
    
    async getUsers(accessToken, active = undefined) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.USERS}?active=${active}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            };
    
            const response = await fetch(url, params);
            
            // Verificar si la solicitud fue exitosa
            if (!response.ok) {
                throw new Error(`Error al obtener usuarios: ${response.statusText}`);
            }
    
            // Convertir el cuerpo de la respuesta a JSON
            const data = await response.json();
    
            // Devolver los datos obtenidos
            return data;
        } catch (error) {
            console.error(error);
            throw error; // Re-lanzar el error para que pueda ser manejado por el componente
        }
    }
    
    async updateUser(accessToken, idUser, userData) {
        try {
            const data = userData;
            if(!data.password){
                delete data.password;
            }

            const formData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });

            if(data?.fileAvatar && data?.avatar === "" || data?.avatar === undefined) {
                formData.append("avatar", data.fileAvatar);
            }

            const url = `${this.baseApi}/${ENV.API_ROUTES.USER}/${idUser}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            console.error(error);
        }
    }
}