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
  Spinner,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HeartFilledIcon } from "../icons";
import { useSession } from "next-auth/react";
import { skipToken } from "@reduxjs/toolkit/query";

interface StoreProductListsProps {
  gridColsDesktop?: string;
  products: ProductRequest[];
  displayActionBtn?: boolean;
}
export default function StoreProductLists({
  products,
  gridColsDesktop = "sm:grid-cols-8",
  displayActionBtn,
}: StoreProductListsProps) {
  console.log("displayActionBtn: ", displayActionBtn);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [wishListProductId, setWishListProductId] = useState<string | null>(
    null,
  );
  const { data: user } = useGetUserProfileQuery(
    (session?.user.id as void) ?? skipToken,
  );

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
      setWishListProductId(productId);

      const res = await toggleWishList({ productId }).unwrap();

      addToast({
        title: res.data.wishlisted ? "Item added" : "Item removed",
        description: res.message,
        color: "success",
      });
    } catch {
      addToast({
        title: "Error occurred",
        description: "An error occurred, try again",
        color: "danger",
      });
    } finally {
      setWishListProductId(null);
    }
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
              {displayActionBtn ? (
                ""
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleWishListToggle(product._id || "");
                    }}
                    className="w-8 h-8 border-1 border-primary/30 text-primary flex items-center justify-center p-2 shadow rounded-md"
                  >
                    {wishListProductId === product._id ? (
                      <Spinner size="sm" variant="spinner" color="primary" />
                    ) : !isWishlisted ? (
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
              )}
            </div>
          );
        })}
    </div>
  );
}
