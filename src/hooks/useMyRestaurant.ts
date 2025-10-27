import { myRestaurantApi } from "@/api/my-restaurant.client";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient , useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";

// Query keys factory
export const queryKeys = {
  all: ["my-restaurant"] as const,
  myrestaurant: () => [...queryKeys.all, "current"] as const,
  myrestaurantById: (id: string) => [...queryKeys.all, id] as const,
};

// export const useGetCurrentUser = () => {
//   const {user: auth0User, isLoading: auth0Loading} = useAuth0();
//   return (
//     useQuery({
//       queryKey : queryKeys.user(),
//       queryFn : userApi.getCurrentUser,
//       enabled : !!auth0User && !auth0Loading, // Only fetch when authenticated
//       staleTime: Infinity, // User data doesn't change often,
//     })
//   )
// }

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


// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();


//   return useMutation({
//     mutationFn : (userData: User) => {
//       return userApi.updateCurrentUser(userData);
//     },
//     onSuccess : (data) => {
//       queryClient.setQueryData(queryKeys.user(), data);
//       queryClient.invalidateQueries({ queryKey: queryKeys.user() });
//       toast.success("User Profile updated successfully!");
//     },
//     onError: (error: any) => {
//         console.error("Error updating user:", error);
//         toast.error(error.response?.data?.error || "Failed to update user profile");
//     },
//   })
// }

export const useMyRestaurant = () => {
//   const {data: user , isLoading , error} = useGetCurrentUser()
      const createMyRestaurantMutation = useCreateMyRestaurant();
    //   const updateUserMutation = useUpdateUser()

      return {
        // Create user functions
        createMyRestaurant : createMyRestaurantMutation.mutate,
        isCreatingmyRestaurant: createMyRestaurantMutation.isPending,

        // update user functions
        // updateUser : updateUserMutation.mutate,
        // updateUserAsync: updateUserMutation.mutateAsync,
        // isUpdatingUser: updateUserMutation.isPending,
        // updateUserError: updateUserMutation.error,

        // get current user
        // user,
        // isLoading, 
        // error
      }
}