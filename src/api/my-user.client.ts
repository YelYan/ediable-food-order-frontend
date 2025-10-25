import type { User , ApiResponse, CreateUserRequest} from "@/types";
import axiosInstance from "./api-client";

export const userApi = {
    createCurrentUser: async (userData :CreateUserRequest ) => {
        const { data } = await axiosInstance.post<ApiResponse<User>>("/my/user", userData);
        return data.user || data.data!;
    },
    updateCurrentUser : async(userData : User) => {
        const {data} = await axiosInstance.put<ApiResponse<User>>("/my/user" , userData);
        return data.user || data.data!;
    },
    getCurrentUser : async () => {
        const {data} = await axiosInstance.get<ApiResponse<User>>("/my/user");
        return data.user || data.data!;
    }
}

