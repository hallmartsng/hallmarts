"use client";
import { EyeIcon } from "@heroicons/react/24/outline";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React from "react";
import { useDisclosure } from "@heroui/react";
import StoreProfileOrderModal from "./StoreProfileOrderModal";

type OrderType = {
  _id: string;
  date: string;
  status: string;
  quantity: number;
  total: number;
};
const StoreProfileOrders = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const renderCell = (order: OrderType, columnKey: React.Key) => {
    console.log("renderCell:", order);

    switch (columnKey) {
      case "_id":
        return (
          <div className="flex items-start gap-4">
            <div>
              <p>{order._id}</p>
              <p className="text-gray-600">{order._id}</p>
            </div>
          </div>
        );

      case "date":
        return <div className="text-sm w-[100px]">{order.date}</div>;

      case "quantity":
        return <div className="text-sm">{order.quantity}</div>;
      case "status":
        return <div className="text-sm">{order.status}</div>;
      case "total":
        return <div className="text-sm">${order.total}</div>;

      default:
        return order[columnKey as keyof OrderType] as React.ReactNode;
    }
  };
  const products: OrderType[] = [
    {
      _id: "7763393893033",
      quantity: 2,
      total: 400.0,
      date: "Mar 23, 2026",
      status: "pending",
    },
    {
      _id: "7763390093033",
      quantity: 9,
      total: 500.0,
      date: "Feb 23, 2026",
      status: "delivered",
    },
  ];
  return (
    <section className="w-full flex flex-col gap-10 sm:pt-10 pt-5">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold capitalize">Order History</h1>
        <p className="text-gray-600 sm:w-[350px]">Manage all of your orders.</p>
      </div>
      <Table
        isHeaderSticky
        aria-label="Order table"
        onRowAction={(key) => {
          onOpen();
        }}
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn key="_id" allowsSorting>
            Order ID
          </TableColumn>

          <TableColumn key="date">Date</TableColumn>

          <TableColumn key="quantity">Quantity</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="total">Total</TableColumn>
        </TableHeader>

        {products.length > 0 || false ? (
          <TableBody<OrderType>
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
              <TableRow key={item._id} className="hover:cursor-pointer">
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

      <StoreProfileOrderModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </section>
  );
};

export default StoreProfileOrders;
