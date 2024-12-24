import useSWR from "swr";
import { fetchCategories } from "@/lib/api";

export const useFetchCategories = () => {
  const { data, error, isLoading } = useSWR("categories", fetchCategories);
  return {
    categories: data || [],
    isLoading,
    error,
  };
};
