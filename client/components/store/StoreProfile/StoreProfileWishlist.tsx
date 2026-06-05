"use client";

import {
  addToast,
  Button,
  Image,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { useState } from "react";
import nairaSymbol from "@/utils/symbols";
import {
  useGetWishlistQuery,
  useToggleWishlistMutation,
} from "@/lib/services/store/wishlist.api";
import { ProductRequest } from "@/types/product.types";
import { TrashIcon } from "@heroicons/react/24/outline";

const StoreProfileWishlist = () => {
  const [wishListProductId, setWishListProductId] = useState<string | null>(
    null,
  );

  const { data, isLoading: isLoadingWishList } = useGetWishlistQuery();

  const [toggleWishList, { isLoading: isLoadingWishListToggle }] =
    useToggleWishlistMutation();

  const handleWishListToggle = async (productId: string) => {
    try {
      setWishListProductId(productId);
      const res = await toggleWishList({ productId }).unwrap();

      addToast({
        title: "Item removed",
        description: res.message,
        color: "success",
      });
    } catch {
      addToast({
        title: "Error occurred",
        description: "An error occurred, try again",
        color: "danger",
      });
    }
  };

  const renderCell = (product: ProductRequest, columnKey: React.Key) => {
    console.log("renderCell:", product);

    switch (columnKey) {
      case "item":
        return (
          <div className="flex items-center gap-4 w-[200px] sm:w-auto">
            <div className="w-[80px]">
              <Image
                alt={product.title}
                className="w-full object-cover h-[70px]"
                radius="lg"
                shadow="sm"
                src={`${product?.images ? product?.images[0].url : "/image-upload-image-fallback.png"}`}
                width="100%"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{product.title} </p>
              <p className="text-gray-500 text-xs">{product.campus} </p>
            </div>
          </div>
        );

      case "title":
        return <div className="text-sm w-[100px]">{product.title}</div>;
      case "price":
        return (
          <div className="text-sm w-[100px]">
            {" "}
            {`${nairaSymbol()}${product.price.toLocaleString()}`}
          </div>
        );
      //   case "discount":
      //     return <div className="text-sm"> {`${nairaSymbol()}${product.dis.toLocaleString()}`}</div>;
      case "stock":
        return <div className="text-sm">{product.stock}</div>;
      case "action":
        return (
          <div className="text-sm">
            <button
              onClick={() => {
                handleWishListToggle(product._id || "");
              }}
            >
              {wishListProductId === product._id && isLoadingWishListToggle ? (
                <Spinner size="sm" variant="spinner" color="primary" />
              ) : (
                <TrashIcon className="size-5 text-primary" />
              )}
            </button>
          </div>
        );

      default:
        return product[columnKey as keyof ProductRequest] as React.ReactNode;
    }
  };

  return (
    <section className="w-full flex flex-col gap-10 sm:pt-10 pt-5">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold capitalize">My Wishlist</h1>
        <p className="text-gray-600 sm:w-[350px]">Manage all of your wishes.</p>
      </div>
      <Table isHeaderSticky aria-label="Order table">
        <TableHeader>
          <TableColumn key="item">Item</TableColumn>
          <TableColumn key="title">Title</TableColumn>
          <TableColumn key="price">Price</TableColumn>
          <TableColumn key="stock">Stock</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>

        <TableBody<ProductRequest>
          items={data?.data ?? []}
          isLoading={isLoadingWishList}
          loadingContent={
            <Spinner
              label="Loading..."
              size="sm"
              variant="spinner"
              color="primary"
            />
          }
          emptyContent={
            <div>
              <p className="mb-4">No items in wishist</p>
              <Button
                as={"a"}
                size="sm"
                href={"/store"}
                className="text-white bg-primary font-semibold"
              >
                {" "}
                Start adding items to wishlist
              </Button>
            </div>
          }
        >
          {(item) => (
            <TableRow key={item._id} className="hover:cursor-pointer">
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default StoreProfileWishlist;
