"use client";
import {
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
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
import { useGetUserOrdersQuery } from "@/lib/services/user/order.api";
import { OrderRequest } from "@/types/order.types";
import nairaSymbol from "@/utils/symbols";
import { formatDate } from "@/utils/dateFormat.utils";

const StoreProfileOrders = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedOrder, setSelectedOrder] = React.useState<OrderRequest | null>(
    null,
  );

  const { data, isLoading } = useGetUserOrdersQuery();

  const renderCell = (order: OrderRequest, columnKey: React.Key) => {
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

      case "updatedAt":
        return (
          <div className="text-sm w-[100px]">{`${formatDate(order.updatedAt)}`}</div>
        );

      case "quantity":
        return <div className="text-sm">{order.items.length}</div>;
      case "paymentStatus":
        return (
          <div
            className={`${order.paymentStatus === "paid" ? "bg-success-50 text-success" : "bg-warning-50 text-warning"} capitalize w-[90px] rounded-lg py-1 px-2 flex gap-1 items-center justify-center text-xs`}
          >
            {order.paymentStatus === "paid" ? (
              <CheckCircleIcon className="size-4" />
            ) : (
              <ClockIcon className="size-4" />
            )}{" "}
            <span>{order.paymentStatus} </span>
          </div>
        );
      case "orderStatus":
        return (
          <div
            className={`${order.orderStatus === "accepted" ? "bg-success-50 text-success" : order.orderStatus === "processing" ? "bg-warning-50 text-warning" : "bg-primary-50 text-primary"} capitalize w-[90px] rounded-lg py-1 px-2 flex gap-1 items-center justify-center text-xs`}
          >
            {order.orderStatus === "accepted" ? (
              <CheckCircleIcon className="size-4" />
            ) : order.orderStatus === "processing" ? (
              <ClockIcon className="size-4" />
            ) : (
              "Delivered"
            )}{" "}
            <span>{order.orderStatus}</span>
          </div>
        );
      case "totalPrice":
        return (
          <div className="text-sm w-[100px]">{`${nairaSymbol()} ${order.totalPrice.toLocaleString()}`}</div>
        );

      default:
        return order[columnKey as keyof OrderRequest] as React.ReactNode;
    }
  };

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
          console.log("key onRowAction: ", key);

          const orderSelected = data?.data.find((order) => order._id === key);
          if (orderSelected) {
            setSelectedOrder(orderSelected);
          }
          onOpen();
        }}
        onSelectionChange={(key) => {
          console.log("key onSelectionChange: ", key);
        }}
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn key="_id">Order ID</TableColumn>

          <TableColumn key="updatedAt">Date</TableColumn>

          <TableColumn key="quantity">Quantity</TableColumn>
          <TableColumn key="paymentStatus">Payment</TableColumn>
          <TableColumn key="orderStatus">Order Status</TableColumn>
          <TableColumn key="totalPrice">Total</TableColumn>
        </TableHeader>

        <TableBody<OrderRequest>
          items={data?.data ?? []}
          isLoading={isLoading}
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
              <p className="mb-4">No orders yet</p>
              <Button
                as={"a"}
                size="sm"
                href={"/store"}
                className="text-white bg-primary font-semibold"
              >
                {" "}
                Start shopping
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
      {selectedOrder && (
        <StoreProfileOrderModal
          selectedOrder={selectedOrder}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </section>
  );
};

export default StoreProfileOrders;
