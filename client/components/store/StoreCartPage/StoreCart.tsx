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
  TrashIcon,
  // TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import {
  addToCart,
  deleteFromCart,
  removeFromCart,
} from "@/lib/slices/cartSlice";
import nairaSymbol from "@/utils/symbols";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { ImagePreview } from "@/types";
import { getCartLocalStorageItem } from "@/lib/localStorage";

interface CartItem {
  productId: string;
  vendorId: string;
  name: string;
  price: number;
  quantity: number;
  imgUrl: ImagePreview[];
}

const StoreCart = () => {
  const router = useRouter();

  const cart = useAppSelector((state) => state.cart);
  console.log("cart: ", cart);

  const dispatch = useAppDispatch();

  const handleAddToCart = (product: CartItem) => {
    dispatch(
      addToCart({
        productId: product.productId,
        vendorId: "v1",
        name: product.name,
        price: Number(product.price),
        quantity: 1,
        imgUrl: product.imgUrl,
      }),
    );
  };
  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const renderCell = (product: CartItem, columnKey: React.Key) => {
    console.log("renderCell:", product);

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-4 w-[200px] sm:w-auto">
            <div className="flex w-20 h-20 items-center gap-4">
              <Image
                src={
                  product.imgUrl[0].url ?? "/image-upload-image-fallback.png"
                }
                alt={`${product.name}`}
                width={80}
                height={80}
                className="shadow rounded-md object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{product.name} </p>
              <Button
                onPress={() => {
                  dispatch(deleteFromCart(product.productId));
                }}
                size="sm"
                className="text-primary bg-primary-50 font-medium shadow rounded-md text-xs flex items-center gap-1"
              >
                <TrashIcon className="size-4 text-primary" />
                <span>Remove</span>
              </Button>
            </div>
          </div>
        );

      case "price":
        return (
          <div className="text-sm w-[100px]">
            {`${nairaSymbol()}${product.price.toLocaleString()}`}
          </div>
        );

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
          <div className="text-sm w-[100px]">{`${nairaSymbol()} ${(product.price * product.quantity).toLocaleString()}`}</div>
        );
      default:
        return product[columnKey as keyof CartItem] as React.ReactNode;
    }
  };

  return (
    <>
      <Table isHeaderSticky aria-label="cart table">
        <TableHeader>
          <TableColumn key="name">Item</TableColumn>

          <TableColumn key="price">Price</TableColumn>

          <TableColumn key="quantity">Quantity</TableColumn>
          <TableColumn key="total">Total</TableColumn>
        </TableHeader>

        {
          <TableBody<CartItem>
            items={cart.items ?? []}
            isLoading={!cart ? true : false}
            loadingContent={
              <Spinner
                label="Loading..."
                size="sm"
                variant="spinner"
                color="primary"
              />
            }
            emptyContent={
              <div className="w-full h-full py-10 flex items-center gap-3 justify-center flex-col">
                <PiShoppingCartSimpleDuotone className="size-20" />
                <p className="text-sm ">There is no item here</p>
                <Button
                  as={"a"}
                  href="/store"
                  className="bg-primary text-white font-semibold"
                >
                  Shop now
                </Button>
              </div>
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

      {/* Cart Summary   */}
      {cart.subtotal > 0 && (
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
            <strong>
              Sub total: {`${nairaSymbol()}${cart.subtotal.toLocaleString()}`}
            </strong>
            <small>Discount. {`${nairaSymbol()}0.00`}</small>
            <h1 className="font-extrabold text-lg">
              Total : {`${nairaSymbol()}${cart.subtotal.toLocaleString()}`}
            </h1>
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
              <span>{`${nairaSymbol()}${cart.subtotal.toLocaleString()}`}</span>
            </span>
            <span className="flex items-center justify-between w-full">
              <span>Discount</span>
              <span>{`${nairaSymbol()}0.00`}</span>
            </span>
            <span className="flex items-center justify-between w-full">
              <span>Total:</span>
              <span>{`${nairaSymbol()}${cart.subtotal.toLocaleString()}`}</span>
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
      )}
    </>
  );
};

export default StoreCart;
