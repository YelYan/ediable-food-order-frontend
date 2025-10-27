import { myRestaurantApi } from "@/api/my-restaurant.client";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient , useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";

// Query keys factory
export const queryKeys = {
  all: ["my-restaurant"] as const,
  myrestaurant: () => [...queryKeys.all, "current"] as const,
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

export const useMyRestaurant = () => {
    const { data : myrestaurant  } = useCurrentMyRestaurant();
    const createMyRestaurantMutation = useCreateMyRestaurant();
      const updateMyRestaurantMutation = useUpdateMyRestaurant()

      return {
        // Create my restaurant functions
        createMyRestaurant : createMyRestaurantMutation.mutate,
        isCreatingmyRestaurant: createMyRestaurantMutation.isPending,

        // get my restaurant
        myrestaurant,
        

        // update user functions
        updateMyRestaurant : updateMyRestaurantMutation.mutate,
        isUpdatingResstaurant: updateMyRestaurantMutation.isPending,
      }
}