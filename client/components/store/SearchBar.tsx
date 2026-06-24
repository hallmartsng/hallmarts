"use client";

import React, { useEffect } from "react";
import { Autocomplete, AutocompleteItem, Input, Spinner } from "@heroui/react";
import useDebounce from "@/hooks/useDebounceHook";
import { SearchIcon } from "../icons";
import { useLazyFilterProductsQuery } from "@/lib/services/store/product.api";
import { useRouter } from "next/navigation";
import { slugify } from "@/utils/slugify";
import { skip } from "node:test";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const debouncedSearch = useDebounce(search, 500);

  const [searchProducts, { data, isFetching }] = useLazyFilterProductsQuery();

  useEffect(() => {
    if (debouncedSearch.trim()) {
      searchProducts({
        search: debouncedSearch,
        limit: 10,
      });
    }
  }, [debouncedSearch, searchProducts]);
  return (
    <Autocomplete
      aria-label="search products"
      placeholder="Search products, vendors, campus"
      inputValue={search}
      onInputChange={setSearch}
      startContent={<SearchIcon />}
      isClearable
      onClear={() => setSearch("")}
      selectorIcon={
        isFetching ? (
          <Spinner size="sm" variant="spinner" color="primary" />
        ) : null
      }
    >
      {!isFetching && data?.data.length
        ? data.data.map((product) => (
            <AutocompleteItem
              key={product._id}
              textValue={product.title}
              onPress={() =>
                router.push(
                  `/store/product-list/${encodeURIComponent(product.title)}`,
                )
              }
            >
              <div className="flex flex-col">
                <span>{product.title}</span>
                <span className="text-xs text-default-500">
                  {product.description?.toLocaleString()}
                </span>
              </div>
            </AutocompleteItem>
          ))
        : null}
    </Autocomplete>
  );
};

export default SearchBar;
