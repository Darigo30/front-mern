import { ENV } from "../utils/";

export class Course {
    baseApi = ENV.BASE_API;

    async getCourses(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limtFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}?${pageFilter}&${limtFilter}`;

            const response = await fetch(url, params);
            const result = await response.json();
            console.log(result);
            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}