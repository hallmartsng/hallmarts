import React from "react";

interface SectionHeaderProps {
  headline?: string;
  headerText?: string;
  paragraphText?: string;
}

const SectionHeader = ({ props }: { props: SectionHeaderProps }) => {
  return (
    <div className="flex flex-col items-start gap-3">
      <small className="bg-white text-black shadow font-semibold rounded-md px-2 py-1">
        {props.headline}
      </small>
      <h1 className="sm:text-5xl text-3xl font-extrabold">
        {props.headerText}
      </h1>
      <p className="text-gray-600">{props.paragraphText}</p>
    </div>
  );
};

export default SectionHeader;
