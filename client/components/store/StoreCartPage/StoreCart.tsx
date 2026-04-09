"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
  Tooltip,
  Input,
  Button,
} from "@heroui/react";

import {
  MinusIcon,
  // EyeIcon,
  // PencilIcon,
  PlusIcon,
  // TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import { addToCart, removeFromCart } from "@/lib/slices/cartSlice";
import nairaSymbol from "@/utils/symbols";

interface CartItem {
  productId: string;
  vendorId: string;
  name: string;
  price: number;
  quantity: number;
  imgUrl?: string;
}

const StoreCart = () => {
  const router = useRouter();

  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: CartItem) => {
    dispatch(
      addToCart({
        productId: product.productId,
        vendorId: "v1",
        name: product.name,
        price: Number(product.price),
        quantity: 1,
      }),
    );
  };
  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  console.log("cart: ", cart);

  const renderCell = (product: CartItem, columnKey: React.Key) => {
    console.log("renderCell:", product);

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-start gap-4 w-[220px] sm:w-auto">
            <Image
              src={product.imgUrl ?? "/image-upload-image-fallback.png"}
              alt={`${product.name}`}
              width={80}
              height={50}
              className="shadow rounded-md"
            />
            <div>
              <p>{product.name}</p>
              <p className="text-gray-600">{product.productId}</p>
            </div>
          </div>
        );

      case "price":
        return <div className="text-sm w-[100px]">{product.price}</div>;

      case "quantity":
        return (
          <div className="flex gap-2 -ml-7">
            <div className="flex items-center gap-2">
              <Tooltip content="Subtract product">
                <button
                  onClick={() => {
                    handleRemoveFromCart(product.productId);
                  }}
                  className=" p-2 rounded-lg text-black font-semibold"
                >
                  <MinusIcon className="w-5 h-5 cursor-pointer" />
                </button>
              </Tooltip>
              <span>{product.quantity}</span>
              <Tooltip content="Add product">
                <button
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                  className=" p-2 rounded-lg text-black font-semibold"
                >
                  <PlusIcon className="w-5 h-5 cursor-pointer" />
                </button>
              </Tooltip>
              {/* <ExpenseRequestFormModal />  */}
            </div>
          </div>
        );
      case "total":
        return (
          <div className="text-sm">{`${nairaSymbol()} ${product.price * product.quantity}`}</div>
        );
      default:
        return product[columnKey as keyof CartItem] as React.ReactNode;
    }
  };

  return (
    <>
      <Table isHeaderSticky aria-label="cart table" aria-sort="other">
        <TableHeader>
          <TableColumn key="name" allowsSorting>
            Item
          </TableColumn>

          <TableColumn key="price">Price</TableColumn>

          <TableColumn key="quantity">Quantity</TableColumn>
          <TableColumn key="total">Total</TableColumn>
        </TableHeader>

        {
          <TableBody<CartItem>
            items={cart.items}
            isLoading={cart.items ? false : true}
            loadingContent={
              <Spinner
                label="Loading..."
                size="sm"
                variant="spinner"
                color="warning"
              />
            }
          >
            {(item) => (
              <TableRow key={item.productId}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        }
      </Table>
      <div className="w-full flex sm:flex-row flex-col gap-8 mt-3 justify-between items-start">
        <div className="w-full sm:w-auto">
          <Input
            type="text"
            name="discoun_code"
            endContent={
              <Button className="bg-black text-white font-semibold" size="sm">
                Apply
              </Button>
            }
            aria-label="discount code"
            placeholder="Enter discoutn code"
          />
        </div>
        <div className="sm:flex hidden flex-col gap-2 items-end">
          <strong>Sub total: $80.00</strong>
          <small>Discount. $60</small>
          <h1 className="font-extrabold text-lg">Total : $80.00</h1>
          <Button
            onPress={() => {
              router.push("/store/checkout");
            }}
            className="bg-primary text-white font-semibold"
          >
            Proceed to checkout
          </Button>
        </div>
        <div className="flex sm:hidden flex-col gap-2 w-full font-medium">
          <span className="flex items-center justify-between w-full">
            <span>Sub total:</span>
            <span>$80.00</span>
          </span>
          <span className="flex items-center justify-between w-full">
            <span>Discount</span>
            <span>$60</span>
          </span>
          <span className="flex items-center justify-between w-full">
            <span>Total:</span>
            <span>$80.00</span>
          </span>

          <Button
            onPress={() => {
              router.push("/store/checkout");
            }}
            className="bg-primary text-white font-semibold"
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default StoreCart;
