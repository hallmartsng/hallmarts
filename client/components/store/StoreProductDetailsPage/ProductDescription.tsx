import React from "react";

const ProductDescription = () => {
  return (
    <div className="px-4 flex flex-col gap-4">
      <p>
        Made with your favourite high-end mid-rise pants in mind. This cropped
        hoddie is a perfectly cozy option for everyday wear. The curved
        overlovked stitched and ribbed panels at the hem put a fresh spin on
        this layering staple.
      </p>
      <div className="flex sm:flex-row flex-col gap-4 items-start justify-between sm:w-1/2">
        <div>
          <h3 className="font-semibold">Key features</h3>
          <ul className="list-disc list-outside pl-5">
            <li>Stable connection</li>
            <li>Stable connection</li>
            <li>Stable connection</li>
            <li>Stable connection</li>
            <li>Stable connection</li>
            <li>Stable connection</li>
            <li>Stable connection</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Specifications</h3>
          <ul className="list-disc list-outside pl-5">
            <li>Brand : Apple</li>
            <li>Color : White</li>
            <li>Size : Extra large</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
