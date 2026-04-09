"use client";

import useDebounce from "@/hooks/useDebounceHook";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import React from "react";
import { SearchIcon } from "../icons";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const data = [
    {
      _id: "8",
      name: "Oraimo",
      category: "Oraimo Head Phones",
    },
  ];

  const onSelectionChange = (value: string) => {
    router.push(`/store/product-list/${value}`);
  };

  return (
    <Autocomplete
      selectorIcon={false}
      placeholder="Search products, vendors, campus"
      labelPlacement="outside"
      inputValue={search}
      aria-label="search product input"
      startContent={<SearchIcon />}
      onInputChange={(value) => {
        setSearch;
        onSelectionChange(value);
      }}
      items={data}
      className="max-w-md sm:shadow-none shadow rounded-lg"
      // onChange={(key)=>onSelectionChange(key as Key)}
    >
      {(item) => (
        <AutocompleteItem key={item._id} textValue={item.name}>
          <div className="flex flex-col">
            <span className="text-small">{item.name}</span>
            <span className="text-tiny text-default-400">
              {item.category} - {item.name}
            </span>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default SearchBar;
