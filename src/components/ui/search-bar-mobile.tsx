// components/SearchBarMobile.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const searchSchema = z.object({
  searchQuery: z.string().min(1, "Restaurant name is required").trim(),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchBarMobileProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  onClose?: () => void;
  variant?: "default" | "mobile";
}

export default function SearchBarMobile({
  placeholder = "Search restaurants...",
  className = "",
  onSearch,
  onClose,
  variant = "default",
}: SearchBarMobileProps) {
  const navigate = useNavigate();

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchQuery: "",
    },
    mode: "onSubmit",
  });

  const handleSubmit = (data: SearchFormData) => {
    if (onSearch) {
      onSearch(data.searchQuery);
    } else {
      navigate(`/search?q=${encodeURIComponent(data.searchQuery)}`);
    }

    if (onClose) {
      onClose();
    }

    form.reset();
  };

  const handleClear = () => {
    form.reset({ searchQuery: "" });
    form.clearErrors();
    form.setFocus("searchQuery");
  };

  const watchedQuery = form.watch("searchQuery");

  if (variant === "mobile") {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={`space-y-3 ${className}`}
        >
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      {...field}
                      type="search"
                      placeholder={placeholder}
                      className="pl-10 pr-10 h-12"
                      autoComplete="off"
                    />
                    {watchedQuery && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={handleClear}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClear}
              disabled={!watchedQuery}
            >
              Clear
            </Button>
            <Button type="submit" variant="default" className="flex-1">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`flex gap-2 items-start ${className}`}
      >
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative flex items-center">
                  <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    {...field}
                    type="search"
                    placeholder={placeholder}
                    className="pl-10 pr-10"
                    autoComplete="off"
                  />
                  {watchedQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 h-7 w-7"
                      onClick={handleClear}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={!watchedQuery}
        >
          Clear
        </Button>
        <Button type="submit" variant="default">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>
    </Form>
  );
}
