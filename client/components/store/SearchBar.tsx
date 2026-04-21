"use client";

import React from "react";
import { Autocomplete, AutocompleteItem, Input } from "@heroui/react";
import useDebounce from "@/hooks/useDebounceHook";
import { SearchIcon } from "../icons";

const SearchBar = () => {
  const [search, setSearch] = React.useState("");

  const debouncedSearch = useDebounce(search, 500);

  // const { data, isLoading } = useQuery({

  //   search: debouncedSearch,

  // });

  const data = [
    {
      _id: "8",
      name: "Oraimo",
      category: "Oraimo Head Phones",
    },
  ];

  return (
    <Input
      placeholder="Search products, vendors, campus"
      aria-label="search product input"
      value={search}
      onValueChange={setSearch}
      startContent={<SearchIcon />}
    />
  );
};

export default SearchBar;
