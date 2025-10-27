import axiosInstance from "./api-client";
import type {  ApiResponse, Restaurant} from "@/types";

export const myRestaurantApi = {
    createRestaurant : async (restaurantFormData : FormData) => {
        const { data } = await axiosInstance.post<ApiResponse<Restaurant>>("/my/restaurant" , restaurantFormData);
        return data.restaurant || data.data!;
    }
} 