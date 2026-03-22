"use client";
import React from "react";
import {
  // Pagination,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  // Tooltip,
  User,
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

type ProductType = {
  _id: string;
  name: string;
  price: string;
  imgUrl: string;
  quantity: number;
  total: number;
};

const StoreCart = () => {
  const router = useRouter();
  const products: ProductType[] = [
    {
      _id: "7763393893033",
      name: "Nike Sportwears",
      price: "$450",
      quantity: 2,
      imgUrl: "/images/fruit-8.jpeg",
      total: 400.0,
    },
    {
      _id: "7763390093033",
      name: "Adidas Terrex",
      price: "$250",
      quantity: 6,
      imgUrl: "/images/fruit-8.jpeg",
      total: 1900.0,
    },
  ];
  const renderCell = (product: ProductType, columnKey: React.Key) => {
    console.log("renderCell:", product);

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-start gap-4">
            <Image
              src={product.imgUrl}
              alt={`${product.name}`}
              width={80}
              height={50}
              className="shadow rounded-md"
            />
            <div>
              <p>{product.name}</p>
              <p className="text-gray-600">{product._id}</p>
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
                    console.log("clicked");
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
                    console.log("clicked");
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
        return <div className="text-sm">#{product.total}</div>;
      default:
        return product[columnKey as keyof ProductType] as React.ReactNode;
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

        {products.length > 0 || false ? (
          <TableBody<ProductType>
            items={products}
            isLoading={false}
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
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No data to display."}>{[]}</TableBody>
        )}
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
