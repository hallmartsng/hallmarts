import React from "react";

interface StoreBannerProps {
  headerText: string;
  paragraphText: string;
  actionLink: string;
  bgColor: string;
  imgUrl: string;
}
const StoreBanner = ({ props }: { props: StoreBannerProps }) => {
  return (
    <div
      className={`${props.bgColor} rounded-md shadow sm:h-[340px] w-full p-4`}
    >
      <div>{props.headerText}</div>
    </div>
  );
};

export default StoreBanner;
