import { useState } from "react";
import { useParams } from "react-router";
import { useSearchRestaurant } from "@/hooks/useRestaurant";
import LoadingSpinner from "@/components/ui/loading";
import CuisineFilter from "@/components/CuisineFilter";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams<{ city: string }>();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { data: results, isLoading } = useSearchRestaurant(city || "");

  const handleCusiineChange = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines,
      page: 1,
    }));
  };

  if (!city) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-semibold">No city specified</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner type="animated" size="md" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr]">
      <div id="cuisine-list" className="">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={handleCusiineChange}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="">
        search card
      </div>
    </div>
  );
};

export default SearchPage;
