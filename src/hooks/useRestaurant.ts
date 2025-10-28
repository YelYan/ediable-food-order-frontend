import { restaurantApi } from "@/api/restaurant.client";
import { useQuery } from "@tanstack/react-query";
import type { SearchStateT } from "@/pages/search/SearchPage";

// Query keys factory
export const queryKeys = {
  all: ["restaurant"] as const,
  search: (city: string, searchState: SearchStateT) => 
    [...queryKeys.all, "search", city, searchState] as const, // refetch whenever city or search state change
};


export const useGetRestaurant = (restaurantId : string) => {
  return useQuery({
    queryKey : queryKeys.all,
    queryFn : () => restaurantApi.getRestaurant(restaurantId),
    enabled : !!restaurantId, // only fetch when restaurnatId is provided
      staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useSearchRestaurant = (searchState : SearchStateT,city : string) => {
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());
  params.set("selectedCuisines", searchState.selectedCuisines.join(","));
  params.set("sortOption", searchState.sortOption);
  return (
    useQuery({
      queryKey : queryKeys.search(city, searchState),
      queryFn : () => restaurantApi.createSearchRestaurant(params, city),
      enabled : !!city, // Only fetch when city is provided
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  )
}