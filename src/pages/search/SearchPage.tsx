import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useParams } from "react-router";
import { useSearchRestaurant } from "@/hooks/useRestaurant";
import LoadingSpinner from "@/components/ui/loading";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import SearchInfo from "@/components/SearchInfo";
import SearchOptions from "@/components/SearchOptions";
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

  const handleSortOption = (value: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption: value,
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

  if (!results?.data || !city) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingBag />
          </EmptyMedia>
          <EmptyTitle>No restaurants found Yet</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
      <div id="cuisine-list" className="">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={handleCusiineChange}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="">
        <div className="flex flex-col gap-4 md:flex-row justify-between">
          <SearchInfo city={city} total={results.pagination.total} />
          <SearchOptions
            onChange={handleSortOption}
            sortOption={searchState.sortOption}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
