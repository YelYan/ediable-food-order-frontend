import axiosInstance from "./api-client";
import type { RestaurantResponse } from "@/types";

export const restaurantApi = {
    createSearchRestaurant : async (params: { toString: () => unknown; }, city : string) => {
        const {data} = await axiosInstance.get<RestaurantResponse>(`/restaurant/search/${city}?${params.toString()}`);
        return data    
    }
}