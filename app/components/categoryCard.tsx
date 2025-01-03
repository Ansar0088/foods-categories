import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "../types";
import { useSetAtom } from "jotai";
import { addToCartAtom } from "../state/cart";
// import { addToCart } from "../store/cartSlice";
// import { useAppDispatch } from "../hooks/store";

interface CategoryCardProps {
  category: Category;
  searchTerm: string;
}

export function CategoryCard({ category, searchTerm }: CategoryCardProps) {
  // const dispatch = useAppDispatch();
  const addToCart = useSetAtom(addToCartAtom);
  const highlightMatchingItem = (text: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</span>
      ) : (
        part
      )
    );
  };

  const filteredItems = searchTerm
    ? category.sale_items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : category.sale_items;

  return (
    <Card className="h-[400px]">
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
        <ScrollArea className="h-[320px] overflow-auto w-full rounded-md">
          <div className="space-y-1 pr-4">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                onClick={() => addToCart(item)}
                className="flex cursor-pointer  items-center justify-between hover:bg-gray-200 transition-colors"
              >
                <div className="flex justify-between w-full">
                  <p className="text-gray-800 ">{highlightMatchingItem(item.name)}</p>
                  <p className="text-sm text-gray-700">{item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}