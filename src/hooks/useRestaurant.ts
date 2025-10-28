import { restaurantApi } from "@/api/restaurant.client";
import { useQuery } from "@tanstack/react-query";

// Query keys factory
export const queryKeys = {
  all: ["restaurant"] as const,
  search : (city : string) =>  [...queryKeys.all, "search", city] as const, // refetch whenever city changes
};

export const useSearchRestaurant = (city : string) => {
  return (
    useQuery({
      queryKey : queryKeys.search(city),
      queryFn : () => restaurantApi.createSearchRestaurant(city),
      enabled : !!city, // Only fetch when city is provided
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  )
}