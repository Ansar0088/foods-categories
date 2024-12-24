"use client";

import { useState } from "react";
import { SearchInput } from "./searchInput";
import { CategoryCard } from "./categoryCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { HardDriveDownload } from "lucide-react";

export default function Categories() {
  const { categories, isLoading, error } = useFetchCategories();
  const [searchTerm, setSearchTerm] = useState("");

  const displayData = searchTerm
    ? categories.filter((category: any) =>
        category.sale_items.some((item: any) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : categories;

  if (error) {
    return <p>Error loading categories:{error.message}</p>;
  }

  return (
    <div className="h-screen bg-gray-100 p-6 sm:p-8">
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      {isLoading && (
        <div className="flex h-96 justify-center items-center">
          <p className="flex gap-2 text-md font-semibold">
            Loading...
            <HardDriveDownload />
          </p>
        </div>
      )}
      <ScrollArea className="h-[550px] w-full rounded-md mt-5 p-5">
        <div className="max-w-4xl w-full space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {displayData.length > 0 ? (
              displayData.map((category: any, index: number) => (
                <CategoryCard
                  key={index}
                  category={category}
                  searchTerm={searchTerm}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No matching items found</p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
