import { userApi } from "@/api/my-user.client";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient , useQuery} from "@tanstack/react-query";
import type { CreateUserRequest , User} from "@/types";
import toast from "react-hot-toast";

// Query keys factory
export const queryKeys = {
  all: ["users"] as const,
  user: () => [...queryKeys.all, "current"] as const,
  userById: (id: string) => [...queryKeys.all, id] as const,
};

export const useGetCurrentUser = () => {
  const {user: auth0User, isLoading: auth0Loading} = useAuth0();
  return (
    useQuery({
      queryKey : queryKeys.user(),
      queryFn : userApi.getCurrentUser,
      enabled : !!auth0User && !auth0Loading, // Only fetch when authenticated
      staleTime: Infinity, // User data doesn't change often,
    })
  )
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : (userData : CreateUserRequest ) => {
            return userApi.createCurrentUser(userData)
        },
        onSuccess : (data) => {
            queryClient.setQueryData(queryKeys.user(), data);
            toast.success("User profile created successfully!");
        },
        onError: (error: any) => {
        console.error("Error creating user:", error);
        toast.error(error.response?.data?.error || "Failed to create user profile");
        },
    })
}


export const useUpdateUser = () => {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn : (userData: User) => {
      return userApi.updateCurrentUser(userData);
    },
    onSuccess : (data) => {
      queryClient.setQueryData(queryKeys.user(), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.user() });
      toast.success("User Profile updated successfully!");
    },
    onError: (error: any) => {
        console.error("Error updating user:", error);
        toast.error(error.response?.data?.error || "Failed to update user profile");
    },
  })
}

export const useUser = () => {
  const {data: user , isLoading , error} = useGetCurrentUser()
      const createUserMutation = useCreateUser();
      const updateUserMutation = useUpdateUser()

      return {
        // Create user functions
        createUser : createUserMutation.mutate,
        createUserAsync: createUserMutation.mutateAsync,
        isCreatingUser: createUserMutation.isPending,
        createUserError: createUserMutation.error,

        // update user functions
        updateUser : updateUserMutation.mutate,
        updateUserAsync: updateUserMutation.mutateAsync,
        isUpdatingUser: updateUserMutation.isPending,
        updateUserError: updateUserMutation.error,

        // get current user
        user,
        isLoading, 
        error
      }
}