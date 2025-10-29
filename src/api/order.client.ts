import axiosInstance from "./api-client";
import type { CheckoutSessionRequest } from "@/types";

export const orderApi = {
    createCheckoutSession : async (checkoutSessionRequest :CheckoutSessionRequest) => {
        const {data} = await axiosInstance.post(`/order/checkout/create-checkout-session`,checkoutSessionRequest )
        return data
    }
}