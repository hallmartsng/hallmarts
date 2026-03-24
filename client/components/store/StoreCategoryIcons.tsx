import {
  ArrowsRightLeftIcon,
  BookOpenIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { PiTShirtLight } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";

export type StoreCategoryIconsTypes =
  | "phones"
  | "health"
  | "electronics"
  | "gaming"
  | "academics"
  | "fashion"
  | "bid";

type Type = {
  value: StoreCategoryIconsTypes;
};
export const StoreCategoryIcons = ({ value }: Type) => {
  if (value === "phones") {
    return <DevicePhoneMobileIcon className="size-5" />;
  }
  if (value === "health") {
    return <HeartIcon className="size-5" />;
  }
  if (value === "electronics") {
    return <ComputerDesktopIcon className="size-5" />;
  }
  if (value === "fashion") {
    return <PiTShirtLight className="size-5" />;
  }
  if (value === "gaming") {
    return <IoGameControllerOutline className="size-5" />;
  }
  if (value === "academics") {
    return <BookOpenIcon className="size-5" />;
  }
  if (value === "bid") {
    return <ArrowsRightLeftIcon className="size-5" />;
  }
};
