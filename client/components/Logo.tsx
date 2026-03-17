import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="h-16 w-16 flex items-center justify-center rounded-4xl">
      <Image
        src={"/brand_logo/icon.png"}
        width={100}
        height={100}
        alt="Hallmarts logo"
        className="object-fill"
      />
    </div>
  );
};

export default Logo;
