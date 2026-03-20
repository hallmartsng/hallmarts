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
} from "@heroui/react";

import {
  MinusIcon,
  // EyeIcon,
  // PencilIcon,
  PlusIcon,
  // TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

type ProductType = {
  _id: string;
  name: string;
  price: string;
  imgUrl: string;
  quantity: number;
  total: number;
};

const StoreCart = () => {
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

      // case 'budget':
      //   return `₦${product.budget.toLocaleString()}`;

      // case "startDate":
      //   return product.startDate;
      // case "endDate":
      //   return product.endDate;

      // case "phase":
      //   return <div className="capitalize">{product.phase}</div>;

      // case "assignedTo":
      //   return (
      //     <div className="capitalize truncate w-1/2">
      //       {product.assignedTo[0].email}
      //     </div>
      //   );

      // case "status":
      //   return (
      //     <Progress
      //       aria-label="Project progress"
      //       classNames={{
      //         base: "w-[220px]",
      //         indicator: `${project.status === 100 ? "bg-green-400" : "bg-[#F19645]"}`,
      //         label: "tracking-wider font-medium text-default-600",
      //         value: "text-sm",
      //       }}
      //       showValueLabel={true}
      //       size="md"
      //       value={project.status}
      //     />
      //   );

      // case "location":
      //   return (
      //     <div className="text-sm capitalize">{project.location.state}</div>
      //   );

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
      <Table
        isHeaderSticky
        // bottomContent={
        //   <div className="flex justify-end py-4">
        //     <Pagination
        //       color="warning"
        //       page={page}
        //       total={totalPages}
        //       onChange={setPage}
        //       showControls
        //     />
        //   </div>
        // }
        aria-sort="other"
      >
        <TableHeader>
          <TableColumn
            key="name"
            // onClick={() => handleSort("name")}
            allowsSorting
          >
            Item
          </TableColumn>

          {/* <TableColumn
            key="client"
            onClick={() => handleSort('client')}
            allowsSorting
          >
            Client
          </TableColumn> */}

          <TableColumn
            key="price"
            // onClick={() => handleSort("startDate")}
            // allowsSorting
          >
            Price
          </TableColumn>
          {/* <TableColumn key="endDate">End Date</TableColumn>

          <TableColumn key="status">Status</TableColumn>

          <TableColumn key="phase">Phase</TableColumn> */}
          {/* {operationsTab !== "owner" ? (
            <TableColumn key="assignedTo">Supervisor</TableColumn>
          ) : (
            <></>
          )} */}

          <TableColumn key="quantity">Quantity</TableColumn>
          <TableColumn key="total">Total</TableColumn>

          {/* {operationsTab === "owner" && !isLoading ? (
            <TableColumn key="actions">Action</TableColumn>
          ) : (
            <></>
          )} */}
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
    </>
  );
};

export default StoreCart;
