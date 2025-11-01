import axiosInstance from "./api-client";
import type { ApiResponse, OrderStatus, Restaurant, OrderT} from "@/types";

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
    },
    getMyRestaurantOrders : async () => {
        const {data} = await axiosInstance.get<ApiResponse<OrderT[]>>("/my/restaurant/order");
        return data
    },
    updateMyRestaurantOrdersStatus : async (orderId : string, status : OrderStatus) => {
        const {data} = await axiosInstance.patch<ApiResponse<OrderT>>(`/my/restaurant/order/${orderId}/status`, status)
        return data
    }
} 