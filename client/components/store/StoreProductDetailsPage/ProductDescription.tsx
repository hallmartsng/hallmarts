import React from "react";

interface ProductDescriptionProps {
  data: {
    description: string;
    features?: string[];
    brand?: string;
    colors?: string[];
    sizes?: string[];
  };
}
const ProductDescription = ({ data }: ProductDescriptionProps) => {
  return (
    <div className="px-4 flex flex-col gap-4">
      <p>{data.description}</p>
      <div className="flex sm:flex-row flex-col gap-4 items-start justify-between sm:w-1/2">
        <div>
          <h3 className="font-semibold">Key features</h3>
          {data.features?.length ? (
            <ul className="list-disc list-outside pl-5">
              {data.features.map((feature, key) => {
                return <li key={key}>{feature}</li>;
              })}
            </ul>
          ) : (
            "N/A"
          )}
        </div>
        <div>
          <h3 className="font-semibold">Specifications</h3>
          <ul className="list-disc list-outside pl-5">
            <li>Brand : {data.brand || "N/A"}</li>
            <li>
              Colors :{" "}
              {data.colors?.length
                ? data.colors.map((color, key) => {
                    return <span key={key}>{color}</span>;
                  })
                : "N/A"}
            </li>
            <li>
              Sizes :{" "}
              {data.sizes?.length
                ? data.sizes.map((size, key) => {
                    return <span key={key}>{size}</span>;
                  })
                : "N/A"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
