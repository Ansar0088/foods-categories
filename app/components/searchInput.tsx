import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full sm:w-[684px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
      <Input
        type="search"
        placeholder="Search products..."
        className="w-full border-gray-300 rounded-lg h-10 pl-10 pr-4 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-700"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}