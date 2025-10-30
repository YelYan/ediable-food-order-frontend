import { orderApi } from "@/api/order.client";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { CheckoutSessionRequest } from "@/types";
import toast from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";


export const queryKeys = {
    all : ["order"] as const,
    order : () => [...queryKeys.all, "current"] as const
}

export const useGetMyOrder = () => {
      const {user: auth0User, isLoading: auth0Loading} = useAuth0();
    return useQuery({
        queryKey : queryKeys.order(),
        queryFn : orderApi.getMyOrder,
        enabled : !!auth0User && !auth0Loading, // Only fetch when authenticated
        staleTime: Infinity, // User data doesn't change often,
    })
}

export const useCreateCheckoutSession = () => {
    return useMutation({
        mutationFn : (checkoutSessionRequest : CheckoutSessionRequest) => {
            return orderApi.createCheckoutSession(checkoutSessionRequest)
        },
        onSuccess : (data) => {
            console.log(data, "checkout session")
            toast.success("Checkout successfully!");
        },
        onError: (error: any) => {
        console.error("Error checkout session creating:", error);
        toast.error(error.response?.data?.error || "Failed to create checkout session");
        },
    })
}

export const useOrder = () => {
    const createCheckoutSessionMutation = useCreateCheckoutSession();

    return {
        createCheckoutSession : createCheckoutSessionMutation.mutateAsync,
        isCreatingCheckoutSession : createCheckoutSessionMutation.isPending
    }
}