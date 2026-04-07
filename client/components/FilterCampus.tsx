"use client";

import { useMemo } from "react";
import { campuses } from "@/data/campuses";
import { Select, SelectItem } from "@heroui/select";

const FilterCampuses = ({
  code,
  name,
  isRequired,
}: {
  code: string;
  name: string;
  isRequired: boolean;
}) => {
  const filteredCampuses = useMemo(() => {
    const countryCampuses = campuses.find((country) => country.code === code);
    if (!countryCampuses) return []; // Fallback if no match

    return [...countryCampuses.campuses].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [code]);

  return (
    <Select
      label="Campus"
      isRequired={isRequired}
      labelPlacement="outside"
      name={name}
      className="sm:w-full w-[280px]"
      aria-label="select campus"
      placeholder="Select campus"
      // errorMessage="Select campus"
      errorMessage={({
        validationDetails,
      }: {
        validationDetails: ValidityState;
      }) => {
        if (validationDetails.valueMissing) {
          return "Please select a campus";
        }

        return;
      }}
    >
      {filteredCampuses.length > 0 ? (
        filteredCampuses.map((campus) => (
          <SelectItem key={campus.name} textValue={campus.name}>
            {campus.name}
          </SelectItem>
        ))
      ) : (
        <SelectItem>No campuses found</SelectItem>
      )}
    </Select>
  );
};

export default FilterCampuses;
