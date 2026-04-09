"use client";
import useDebounce from "@/hooks/useDebounceHook";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import React from "react";
import { SearchIcon } from "../icons";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const data: {
    _id: string;
    name: string;
    category: string;
  }[] = [
    {
      _id: "8",
      name: "Oraimo",
      category: "Oraimo Head Phones",
    },
  ];

  const onSelectionChange = (key: number) => {
    console.log(key);
    router.push(`/store/product-list/${key}`);
  };

  //   const isLoadingProjects = true;
  return (
    <Autocomplete
      selectorIcon={false}
      placeholder="Search products, vendors, campus"
      labelPlacement="outside"
      inputValue={search}
      aria-label="search product input"
      startContent={<SearchIcon />}
      onInputChange={setSearch}
      //   isLoading={isLoadingProjects}
      defaultItems={data || []}
      className="max-w-md sm:shadow-none shadow rounded-lg"
      onSelectionChange={(key) => onSelectionChange(key as number)}
    >
      {(project) => (
        <AutocompleteItem key={project._id} textValue={project.name}>
          <div className="flex flex-col">
            <span className="text-small">{project.name}</span>
            <span className="text-tiny text-default-400">
              {project.category} - {project.name}
            </span>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default SearchBar;
