import React, { useEffect, useState } from "react";

const SearchBar = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isNaN(parseInt(searchTerm))) return;
    const t = setTimeout(() => {
      onChange(searchTerm);
    }, 1000);
    return () => {
      clearTimeout(t);
    };
  }, [searchTerm]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={"Search Image Number"}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
