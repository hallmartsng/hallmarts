"use client";
import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import {
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

import DashboardOrderModal from "./DashBoardOrderModal";
import { useGetVendorCustomerQuery } from "@/lib/services/vendor/order.api";

type CustomerType = {
  _id: string;
  total_spent: string;
  orders: string;
  department: string;
  customer_name: string;
  item: string;
  campus: string;
  isNew: boolean;
};

const DashboardCustomers = () => {
  const [filterBy, setFilterBy] = useState<string>("");
  const [search, setSearch] = React.useState<string>("");

  const [page, setPage] = React.useState<number>(1);

  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = useGetVendorCustomerQuery();

  console.log("data: ", data);

  const filters = [
    { key: "", label: "All" },
    { key: "active", label: "Active" },
    { key: "new", label: "New" },
  ];

  const products: CustomerType[] = [
    {
      _id: "7763393893033",
      customer_name: "James Udoh",
      total_spent: "$450",
      item: "Balenciage",
      campus: "Babcock univeristy",
      orders: "2",
      department: "Mass Comm.",
      isNew: false,
    },
    {
      _id: "7763390093033",
      customer_name: "Alice Henry",
      total_spent: "$250",
      item: "Balenciage",
      campus: "Nile univeristy",
      orders: "10",
      department: "Business Admin.",
      isNew: true,
    },
  ];
  const renderCell = (customer: CustomerType, columnKey: React.Key) => {
    console.log("renderCell:", customer);

    switch (columnKey) {
      case "id":
        return <div className="text-sm ">{customer._id}</div>;

      case "customer_name":
        return <div className="text-sm ">{customer.customer_name}</div>;
      case "department":
        return <div className="text-sm ">{customer.department}</div>;
      case "campus":
        return <div className="text-sm ">{customer.campus}</div>;
      case "item":
        return <div className="text-sm ">{customer.item}</div>;

      case "total_spent":
        return <div className=" pl-4">{customer.total_spent}</div>;
      case "orders":
        return <div className="text-sm">{customer.orders}</div>;
      case "status":
        return (
          <div className="text-sm flex items-center gap-2">
            {customer.isNew ? (
              <span
                className={`bg-gray-500 text-white rounded-lg flex justify-center p-1 px-2`}
              >
                New
              </span>
            ) : (
              <span
                className={`bg-success text-white rounded-lg flex justify-center p-1 px-2`}
              >
                Active
              </span>
            )}
          </div>
        );

      default:
        return customer[columnKey as keyof CustomerType] as React.ReactNode;
    }
  };
  return (
    <section className="sm:max-w-7xl w-full py-5">
      <div className="flex w-full flex-col gap-4">
        {" "}
        <div className="flex sm:flex-row flex-col gap-4 sm:items-center  justify-between w-full">
          <DashboardHeader
            header="Customers"
            subHeader="View and manage your customer base."
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
              <TableColumn key="customer_name" allowsSorting>
                Customer Name
              </TableColumn>
              <TableColumn key="department">Department</TableColumn>
              <TableColumn key="campus">Campus</TableColumn>

              <TableColumn key="orders">Orders</TableColumn>
              <TableColumn key="total_spent">Total Spent</TableColumn>
              <TableColumn key="status">Status</TableColumn>
            </TableHeader>

            <TableBody<CustomerType>
              items={products}
              isLoading={isLoading}
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
          </Table>
        </div>
      </div>
    </section>
  );
};

export default DashboardCustomers;
