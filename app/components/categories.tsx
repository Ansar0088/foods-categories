"use client";

import { useState } from "react";
import { data } from "./constant";
import { SearchInput } from "./searchInput";
import { CategoryCard } from "./categoryCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("");

  const displayData = searchTerm
    ? data.filter((category) =>
        category.sale_items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data

  return (
    <div className="h-screen bg-gray-100 p-6 sm:p-8">
      
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <ScrollArea className="h-[550px] w-full rounded-md mt-5 p-5">
        <div className="max-w-4xl w-full space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {displayData.length > 0 ? (
              displayData.map((category, index) => (
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
