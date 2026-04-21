"use client";
import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import ProductModal from "./forms/ProductModal";
import {
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import useDebounce from "@/hooks/useDebounceHook";
import { SearchIcon } from "@/components/icons";
import {
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { IoClose } from "react-icons/io5";
import DashboardOrderModal from "./DashBoardOrderModal";
import { useGetVendorOrdersQuery } from "@/lib/services/vendor/order.api";
import { OrderRequest } from "@/types/order.types";
import { formatDate } from "@/utils/dateFormat.utils";
import nairaSymbol from "@/utils/symbols";

const DashboardOrders = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, isLoading } = useGetVendorOrdersQuery();
  const [filterBy, setFilterBy] = useState<string>("");
  const [search, setSearch] = React.useState<string>("");

  const [page, setPage] = React.useState<number>(1);

  const debouncedSearch = useDebounce(search, 500);
  const [selectedOrder, setSelectedOrder] = React.useState<OrderRequest | null>(
    null,
  );

  const filters = [
    { key: "", label: "All" },
    { key: "completed", label: "Completed" },
    { key: "pending", label: "Pending" },
    { key: "cancelled", label: "Cancelled" },
  ];

  console.log("data: ", data);

  const renderCell = (order: OrderRequest, columnKey: React.Key) => {
    console.log("renderCell:", order);

    switch (columnKey) {
      case "id":
        return <div className="text-sm ">{order._id}</div>;

      case "customer_name":
        return (
          <div className="text-sm ">
            {order.user?.fname ?? order.user?.email}
          </div>
        );
      case "address":
        return (
          <div className="text-sm w-[150px] truncate capitalize">
            {order.shippingAddress.address ?? order.user?.campus}
          </div>
        );

      case "totalPrice":
        return (
          <div>{`${nairaSymbol()}${order.totalPrice.toLocaleString()}`}</div>
        );
      case "date_create":
        return (
          <div className="text-sm w-[100px]">{`${formatDate(order.updatedAt)}`}</div>
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
              <IoClose className="size-4" />
            )}{" "}
            <span>{order.orderStatus}</span>
          </div>
        );

      case "paymentStatus":
        return (
          <div
            className={`${order.paymentStatus === "paid" ? "bg-success-50 text-success" : order.paymentStatus === "pending" ? "bg-warning-50 text-warning" : "bg-primary-50 text-primary"} capitalize w-[90px] rounded-lg py-1 px-2 flex gap-1 items-center justify-center text-xs`}
          >
            {order.paymentStatus === "paid" ? (
              <CheckCircleIcon className="size-4" />
            ) : order.paymentStatus === "pending" ? (
              <ClockIcon className="size-4" />
            ) : (
              <IoClose className="size-4" />
            )}{" "}
            <span>{order.paymentStatus}</span>
          </div>
        );

      case "action":
        return (
          <div className="text-sm flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedOrder(order);
                onOpen();
              }}
            >
              <EyeIcon className="size-5 text-gray-600" />
            </button>
          </div>
        );

      default:
        return order[columnKey as keyof OrderRequest] as React.ReactNode;
    }
  };
  return (
    <section className="sm:max-w-7xl w-full py-5">
      <div className="flex w-full flex-col gap-4">
        {" "}
        <div className="flex sm:flex-row flex-col gap-4 sm:items-center justify-between w-full">
          <DashboardHeader
            header="Orders"
            subHeader="Track and manage all customer orders."
          />
        </div>
        <div className=" rounded-lg  w-full  flex flex-col gap-4">
          <div className="flex bg-white rounded-lg p-4 shadow sm:flex-row flex-col sm:items-center justify-end gap-4">
            <Input
              aria-label="Search for orders"
              placeholder="Search by name"
              startContent={
                <SearchIcon className="text-2xl size-4 text-default-400 pointer-events-none shrink-0" />
              }
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-auto"
            />
            <Select
              className="w-[170px] capitalize"
              defaultSelectedKeys={["all"]}
              aria-label="Filter sales chart"
              items={filters}
              selectedKeys={[filterBy]}
              startContent={"Filter:"}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              {filters.map((filter) => (
                <SelectItem key={filter.key} className=" capitalize">
                  {filter.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Table isHeaderSticky aria-label="vendor order table" radius="sm">
            <TableHeader>
              <TableColumn key="id" allowsSorting>
                Order ID
              </TableColumn>
              <TableColumn key="customer_name" allowsSorting>
                Customer Name
              </TableColumn>

              <TableColumn key="address">Shipping address</TableColumn>
              <TableColumn key="totalPrice">Total Price</TableColumn>

              <TableColumn key="orderStatus">Status</TableColumn>
              <TableColumn key="paymentStatus">Payment Status</TableColumn>
              <TableColumn key="date_create">Date</TableColumn>
              <TableColumn key="action">Action</TableColumn>
            </TableHeader>

            <TableBody<OrderRequest>
              items={data?.data || []}
              isLoading={isLoading}
              loadingContent={
                <Spinner
                  label="Loading..."
                  size="sm"
                  variant="spinner"
                  color="primary"
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
          </Table>
        </div>
        {selectedOrder && (
          <DashboardOrderModal
            selectedOrder={selectedOrder}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        )}
      </div>
    </section>
  );
};

export default DashboardOrders;
