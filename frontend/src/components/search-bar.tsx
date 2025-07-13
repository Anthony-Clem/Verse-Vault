"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useVerse } from "@/contexts/verse-context";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { searchVerse, loading } = useVerse();

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 size-4" />
      <Input
        disabled={loading}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") searchVerse(searchText);
        }}
        className="w-full bg-white rounded-full pl-10 pr-6 py-2"
        placeholder="e.g. psalms 105:1"
      />
    </div>
  );
};
export default SearchBar;
