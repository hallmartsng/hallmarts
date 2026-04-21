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

type OrderType = {
  _id: string;
  total_price: string;
  date_create: string;
  status: string;
  customer_name: string;
  item: string;
  payment_status: string;
};
const DashboardOrders = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [filterBy, setFilterBy] = useState<string>("");
  const [search, setSearch] = React.useState<string>("");

  const [page, setPage] = React.useState<number>(1);

  const debouncedSearch = useDebounce(search, 500);

  const filters = [
    { key: "", label: "All" },
    { key: "completed", label: "Completed" },
    { key: "pending", label: "Pending" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const products: OrderType[] = [
    {
      _id: "7763393893033",
      customer_name: "Nike Sportwears",
      total_price: "$450",
      item: "Balenciage",
      payment_status: "approved",
      date_create: "20 Mar,2026",
      status: "approved",
    },
    {
      _id: "7763390093033",
      customer_name: "Adidas Terrex",
      total_price: "$250",
      item: "Balenciage",
      payment_status: "approved",
      date_create: "20 Mar,2026",
      status: "pending",
    },
  ];
  const renderCell = (order: OrderType, columnKey: React.Key) => {
    console.log("renderCell:", order);

    switch (columnKey) {
      case "id":
        return <div className="text-sm ">{order._id}</div>;

      case "customer_name":
        return <div className="text-sm ">{order.customer_name}</div>;
      case "item":
        return <div className="text-sm ">{order.item}</div>;

      case "total_price":
        return <div className=" pl-4">{order.total_price}</div>;
      case "date_create":
        return <div className="text-sm">{order.date_create}</div>;
      case "status":
        return (
          <div
            className={`${order.status === "approved" ? "bg-success-50 text-success" : order.status === "pending" ? "bg-warning-50 text-warning" : "bg-primary-50 text-primary"} capitalize w-[90px] rounded-lg py-1 px-2 flex gap-1 items-center justify-center text-xs`}
          >
            {order.status === "approved" ? (
              <CheckCircleIcon className="size-4" />
            ) : order.status === "pending" ? (
              <ClockIcon className="size-4" />
            ) : (
              <IoClose className="size-4" />
            )}{" "}
            <span>{order.status}</span>
          </div>
        );
      case "action":
        return (
          <div className="text-sm flex items-center gap-2">
            <button
              onClick={() => {
                onOpen();
              }}
            >
              <EyeIcon className="size-5 text-gray-600" />
            </button>
          </div>
        );

      default:
        return order[columnKey as keyof OrderType] as React.ReactNode;
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
          <Table
            isHeaderSticky
            aria-label="cart table"
            aria-sort="other"
            radius="sm"
          >
            <TableHeader>
              <TableColumn key="id" allowsSorting>
                Order ID
              </TableColumn>
              <TableColumn key="customer_name" allowsSorting>
                Customer Name
              </TableColumn>

              <TableColumn key="item">Item</TableColumn>
              <TableColumn key="total_price">Total Price</TableColumn>

              <TableColumn key="status">Status</TableColumn>
              <TableColumn key="payment_status">Payment Status</TableColumn>
              <TableColumn key="date_create">Date</TableColumn>
              <TableColumn key="action">Action</TableColumn>
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
        </div>
        <DashboardOrderModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </section>
  );
};

export default DashboardOrders;
