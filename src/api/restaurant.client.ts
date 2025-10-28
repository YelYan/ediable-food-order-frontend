import axiosInstance from "./api-client";
import type { RestaurantResponse } from "@/types";

export const restaurantApi = {
    createSearchRestaurant : async (city : string) => {
        const {data} = await axiosInstance.get<RestaurantResponse>(`/restaurant/search/${city}`);
        return data    
    }
}