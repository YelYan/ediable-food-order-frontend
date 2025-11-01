import { myRestaurantApi } from "@/api/my-restaurant.client";
import type { ApiResponse, OrderStatus, OrderT } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient , useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";

// Query keys factory
export const queryKeys = {
  all: ["my-restaurant"] as const,
  myrestaurant: () => [...queryKeys.all, "current"] as const,
  orders: () => [...queryKeys.all, "my-restaurant-orders"] as const,
};

export const useCurrentMyRestaurant = () => {
  const {user: auth0User, isLoading: auth0Loading} = useAuth0();
  return (
    useQuery({
      queryKey : queryKeys.myrestaurant(),
      queryFn : myRestaurantApi.getMyRestaurant,
      enabled : !!auth0User && !auth0Loading, // Only fetch when authenticated
      staleTime: Infinity, // User data doesn't change often,
    })
  )
}

export const useCurrentMyRestaurantOrder = () => {
  const {user: auth0User, isLoading: auth0Loading} = useAuth0();
  return (
    useQuery<ApiResponse<OrderT[]>>({
      queryKey : queryKeys.orders(),
      queryFn : myRestaurantApi.getMyRestaurantOrders,
      enabled : !!auth0User && !auth0Loading, // Only fetch when authenticated
      staleTime: Infinity, // User data doesn't change often,
    })
  )
}

export const useCreateMyRestaurant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : (restaurantFormData : FormData ) => {
            return myRestaurantApi.createRestaurant(restaurantFormData)
        },
        onSuccess : (data) => {
            queryClient.setQueryData(queryKeys.myrestaurant(), data);
            toast.success("Restaurant created successfully!");
        },
        onError: (error: any) => {
        console.error("Error creating restaurant:", error);
        toast.error(error.response?.data?.error || "Failed to create restaurant");
        },
    })
}


export const useUpdateMyRestaurant = () => {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn : (restaurantFormData: FormData) => {
      return myRestaurantApi.updateMyRestaurant(restaurantFormData);
    },
    onSuccess : (data) => {
      queryClient.setQueryData(queryKeys.myrestaurant(), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.myrestaurant() });
      toast.success("Restaurant updated successfully!");
    },
    onError: (error: any) => {
        console.error("Error updating user:", error);
        toast.error(error.response?.data?.error || "Failed to update restaurant");
    },
  })
}

export const useUpdateMyRestaurantOrderStatus = () => {
    const queryClient = useQueryClient();
  return (
    useMutation({
      mutationFn: ({orderId , status} : {orderId : string, status : OrderStatus}) => {
        return myRestaurantApi.updateMyRestaurantOrdersStatus(orderId , status)
      },
    onSuccess : (data) => {
      queryClient.setQueryData(queryKeys.orders(), data.data);
      queryClient.invalidateQueries({ queryKey: queryKeys.orders() });
      toast.success(data?.message || "Order updated successfully!");
    },
    onError: (error: any) => {
        console.error("Error updating order status:", error);
        toast.error(error.response?.data?.error || "Failed to update order status");
    }, 
    })
  )
}

export const useMyRestaurant = () => {
    const { data : myrestaurant  } = useCurrentMyRestaurant();
    const {data : orders, isLoading: isGettingOrder } = useCurrentMyRestaurantOrder();
    const createMyRestaurantMutation = useCreateMyRestaurant();
    const updateMyRestaurantMutation = useUpdateMyRestaurant()
    const updateMyRestaurantOrdersStatusMutation = useUpdateMyRestaurantOrderStatus();

      return {
        // Create my restaurant functions
        createMyRestaurant : createMyRestaurantMutation.mutate,
        isCreatingmyRestaurant: createMyRestaurantMutation.isPending,

        // get my restaurant
        myrestaurant,

        // get orders
        orders,
        isGettingOrder,

        //update order status
        updateOrderStatus :  updateMyRestaurantOrdersStatusMutation.mutateAsync,
        isUpdatingOrderStatus : updateMyRestaurantOrdersStatusMutation.isPending,

        // update user functions
        updateMyRestaurant : updateMyRestaurantMutation.mutate,
        isUpdatingResstaurant: updateMyRestaurantMutation.isPending,
      }
}