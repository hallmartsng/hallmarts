"use client";
import { useAppDispatch } from "@/hooks/useReduxHook";
import { useToggleWishlistMutation } from "@/lib/services/store/wishlist.api";
import { useGetUserProfileQuery } from "@/lib/services/user/user.api";
import { addToCart } from "@/lib/slices/cartSlice";
import { ProductRequest } from "@/types/product.types";
import { slugify } from "@/utils/slugify";
import nairaSymbol from "@/utils/symbols";
import { HeartIcon } from "@heroicons/react/24/outline";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { HeartFilledIcon } from "../icons";
import { useSession } from "next-auth/react";

interface StoreProductListsProps {
  gridColsDesktop?: string;
  products: ProductRequest[];
}
export default function StoreProductLists({
  products,
  gridColsDesktop = "sm:grid-cols-8",
}: StoreProductListsProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const { data: user } = useGetUserProfileQuery();

  const [toggleWishList, { isLoading }] = useToggleWishlistMutation();

  const handleWishListToggle = async (productId: string) => {
    if (!session?.user.id) {
      return addToast({
        title: "Not authenticated",
        description: "Login to add item to wishlist",
        color: "danger",
      });
    }
    try {
      const res = await toggleWishList({
        productId,
      }).unwrap();

      if (res.success) {
        addToast({
          title: `${res.data.wishlisted ? "Item added" : "Item removed"}`,
          description: `${res.data.product.title} ${res.data.wishlisted ? "added to" : "removed from"} cart`,
          color: "success",
        });
      }
    } catch (error) {}
  };

  return (
    <div className={`gap-y-10 gap-x-2 grid grid-cols-2  ${gridColsDesktop}`}>
      {products &&
        products.map((product, index) => {
          const isWishlisted = user?.data.wishList?.includes(product._id || "");
          return (
            <div key={product._id}>
              <Card
                isPressable
                shadow="sm"
                className="rounded-md mb-2 w-full"
                onPress={() =>
                  router.push(
                    `/store/product/${slugify(product.title)}-${product._id}`,
                  )
                }
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    alt={product.title}
                    className="sm:w-[150px] w-full object-cover sm:h-[140px] h-[150px]"
                    radius="md"
                    shadow="sm"
                    src={product.images ? product.images[0].url : ""}
                    width="100%"
                  />
                </CardBody>
                <CardFooter className="text-small h-[62px] flex flex-col items-end gap-2">
                  <div className="flex items-start flex-col  text-left w-full">
                    <b className="w-[125px] truncate">{product.title}</b>
                    <p className="text-default-500">{`${nairaSymbol()}${product.price.toLocaleString()}`}</p>
                  </div>
                  {/* <button
              onClick={() => {
                return console.log("add to cart");
              }}
              className="bg-primary text-xs font-semibold rounded-md px-4 py-2 text-white"
            >
              Add to cart
            </button> */}
                </CardFooter>
              </Card>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleWishListToggle(product._id || "")}
                  className="w-8 h-8 border-1 border-primary/30 text-primary flex items-center justify-center p-2 shadow rounded-md"
                >
                  {!isWishlisted ? (
                    <HeartIcon className="size-5" />
                  ) : (
                    <HeartFilledIcon className="size-5" />
                  )}
                </button>
                <Button
                  size="sm"
                  onPress={() => {
                    dispatch(
                      addToCart({
                        productId: product._id ? product._id : "",
                        vendorId: product.vendor ? product.vendor : "",
                        quantity: 1,
                        name: product.title,
                        price: product.price,
                        imgUrl: product.images ?? [],
                      }),
                    );
                    addToast({
                      title: `Cart Updated`,
                      description: `${product.title} added to cart`,
                      color: "success",
                    });
                  }}
                  className="bg-primary w-full text-xs font-semibold rounded-md px-4 py-2 text-white"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
