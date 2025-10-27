import axiosInstance from "./api-client";
import type { ApiResponse, Restaurant} from "@/types";

export const myRestaurantApi = {
    createRestaurant : async (restaurantFormData : FormData) => {
        const { data } = await axiosInstance.post<ApiResponse<Restaurant>>("/my/restaurant" , restaurantFormData);
        return data.restaurant || data.data!;
    },
    getMyRestaurant : async() => {
        const  { data} = await axiosInstance.get("/my/restaurant");
        return data.restaurant || data.data!;
    },
    updateMyRestaurant : async (restaurantFormData : FormData) => {
        const { data } = await axiosInstance.put<ApiResponse<Restaurant>>("/my/restaurant" , restaurantFormData);
        return data.restaurant || data.data!;
    }
} 