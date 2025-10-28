import axiosInstance from "./api-client";
import type { RestaurantResponse, Restaurant , ApiResponse} from "@/types";

export const restaurantApi = {
    createSearchRestaurant : async (params: { toString: () => unknown; }, city : string) => {
        const {data} = await axiosInstance.get<RestaurantResponse>(`/restaurant/search/${city}?${params.toString()}`);
        return data    
    },
    getRestaurant : async (restaurantId : string) => {
        const {data} = await axiosInstance.get<ApiResponse<Restaurant>>(`/restaurant/${restaurantId}`);
        return data.data
    }
}