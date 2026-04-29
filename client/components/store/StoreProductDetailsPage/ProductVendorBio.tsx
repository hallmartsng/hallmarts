import React from "react";

interface ProductVendorProps {
  data: { fName: string; campus: string; department: string; about?: string };
}
const ProductVendorBio = ({ data }: ProductVendorProps) => {
  return (
    <div className="px-4 flex flex-col gap-5">
      <ul>
        <li>
          <strong>Campus:</strong> {data.campus}
        </li>
        <li>
          <strong>Department:</strong> {data.department}
        </li>
      </ul>
      <p>
        {" "}
        {data.fName} is a student of {data.campus}, in the department of{" "}
        {data.department}, that provides quality fashion pieces for campus
        students at affordable prices.
      </p>
    </div>
  );
};

export default ProductVendorBio;
