import { ENV } from "../utils";

export class Course {
    baseApi = ENV.BASE_API;

    async createCourse(accessToken, data) {
        try {
            const formData = new FormData();

            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            if(data?.file) {
                formData.append("file", data.file);
                console.log("data.file", data.file);
            }
        
            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}`;	
            console.log("url en create course", url);
            const params = {
                method: "POST",
                headers: {
                    Authorization:  `Bearer ${accessToken}`,
                },
                body: formData,
            };
            
            const response = await fetch(url, params)
            const result = await response

            if (response.status !== 201) throw result;
           
            return result;
        } catch (error) {
            console.log("error", error);
        }
    }

    async getCourses(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limtFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}?${pageFilter}&${limtFilter}`;

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}