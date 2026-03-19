import useDebounce from "@/hooks/useDebounceHook";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import React from "react";
import { SearchIcon } from "../icons";

const SearchBar = () => {
  const [search, setSearch] = React.useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const data = {
    data: [
      {
        _id: "2",
        name: "Oraimo",
        client: "Oraimo Head Phones",
      },
    ],
  };
  const onSelectionChange = (key: string) => {
    console.log("working");
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
      defaultItems={data?.data || []}
      className="max-w-md"
      onSelectionChange={(key) => onSelectionChange(key as string)}
    >
      {(project) => (
        <AutocompleteItem key={project._id} textValue={project.name}>
          <div className="flex flex-col">
            <span className="text-small">{project.name}</span>
            <span className="text-tiny text-default-400">
              {project.client} - {project.name}
            </span>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default SearchBar;
