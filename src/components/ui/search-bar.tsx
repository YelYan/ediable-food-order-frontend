import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { AnimatedError } from "@/components/ui/animated-error";

const searchSchema = z.object({
  searchQuery: z
    .string()
    .min(1, "Restaurant name is required")
    .min(2, "Please enter at least 2 characters")
    .max(50, "Search query is too long")
    .trim(),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

export default function SearchBar({
  placeholder = "Search restaurants...",
  className = "",
  onSearch,
  defaultValue = "",
}: SearchBarProps) {
  const navigate = useNavigate();

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchQuery: defaultValue,
    },
    mode: "onSubmit", // or "onChange" for real-time validation
  });

  const handleSubmit = (data: SearchFormData) => {
    if (onSearch) {
      onSearch(data.searchQuery);
    } else {
      navigate(`/search?q=${encodeURIComponent(data.searchQuery)}`);
    }
  };

  const handleClear = () => {
    form.reset({ searchQuery: "" });
    form.clearErrors();
    form.setFocus("searchQuery");
  };

  const watchedQuery = form.watch("searchQuery");
  const errors = form.formState.errors;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`space-y-1 ${className}`}
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-0">
                <FormControl>
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                    <Input
                      {...field}
                      type="search"
                      placeholder={placeholder}
                      className={`pl-10 pr-10 transition-all duration-200 ${
                        errors.searchQuery
                          ? "border-destructive focus:ring-destructive/20 animate-pulse-once"
                          : ""
                      }`}
                      autoComplete="off"
                    />
                    {watchedQuery && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 h-7 w-7 transition-all duration-200 hover:scale-110"
                        onClick={handleClear}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
                      </Button>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="primary"
            className="px-6 transition-all duration-200 hover:scale-105"
          >
            Search
          </Button>
        </div>
        <AnimatedError message={errors.searchQuery?.message} />
      </form>
    </Form>
  );
}
