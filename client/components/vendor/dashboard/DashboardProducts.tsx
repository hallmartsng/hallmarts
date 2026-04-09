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
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { IoClose } from "react-icons/io5";
import { useGetProductsQuery } from "@/lib/services/vendor/products.api";
import { ImagePreview } from "@/types";
import { formatDate } from "@/utils/dateFormat.utils";
import nairaSymbol from "@/utils/symbols";

type ProductType = {
  _id: string;
  name: string;
  price: number;
  imgUrl: ImagePreview | null;
  stock: number;
  date_create: string;
  categories: string[];
  status: "approved" | "pending" | "rejected";
  description: string;
};
const DashboardProducts = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [filterBy, setFilterBy] = useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  const [selectedForm, setSelectedForm] = React.useState<{
    title: string;
    formId: string;
    product?: {
      productId: string;
      productTitle: string;
      product?: ProductType;
    };
  }>({
    title: "Add product",
    formId: "add-product-form",
  });
  const [page, setPage] = React.useState<number>(1);

  const debouncedSearch = useDebounce(search, 500);

  const { data: productsData, isLoading: isLoadingProducts } =
    useGetProductsQuery();
  console.log("productsData: ", productsData);

  const filters = [
    { key: "", label: "All" },
    { key: "approved", label: "Approved" },
    { key: "pending", label: "Pending" },
    { key: "declined", label: "Declined" },
  ];

  const products: ProductType[] = productsData?.data
    ? productsData.data.map((product) => {
        return {
          _id: product._id || "",
          name: product.title,
          price: product.price,
          stock: product.stock,
          imgUrl: product.images ? product.images[0] : null,
          date_create: product.createdAt ? product.createdAt : "",
          status: product.status ? product.status : "pending",
          categories: product.categories,
          description: product.description,
        };
      })
    : [];
  const renderCell = (product: ProductType, columnKey: React.Key) => {
    console.log("renderCell:", product);

    switch (columnKey) {
      case "image":
        return (
          <div className="flex w-20 h-20 items-center gap-4">
            <Image
              src={
                product.imgUrl
                  ? product.imgUrl.url
                  : "/image-upload-image-fallback.png"
              }
              alt={`${product.name}`}
              width={80}
              height={80}
              className="shadow rounded-md object-cover"
            />
          </div>
        );

      case "name":
        return (
          <div className="text-sm w-[100px]">
            {" "}
            <p>{product.name}</p>
            {/* <p className="text-gray-600">{product._id}</p> */}
          </div>
        );
      case "price":
        return (
          <div className="text-sm w-[100px]">{`${nairaSymbol()} ${product.price.toLocaleString()}`}</div>
        );

      case "stock":
        return <div className=" pl-4">{product.stock}</div>;
      case "categories":
        return (
          <div className="grid">
            {product.categories.map((category) => {
              return (
                <span key={category} className="font-semibold capitalize">
                  {category}
                </span>
              );
            })}
          </div>
        );
      case "date_create":
        return (
          <div className="text-sm w-[100px]">
            {formatDate(product.date_create)}
          </div>
        );
      case "status":
        return (
          <div
            className={`${product.status === "approved" ? "bg-success-50 text-success" : product.status === "pending" ? "bg-warning-50 text-warning" : "bg-primary-50 text-primary"} capitalize w-[90px] rounded-lg py-1 px-2 flex gap-1 items-center justify-center text-xs`}
          >
            {product.status === "approved" ? (
              <CheckCircleIcon className="size-4" />
            ) : product.status === "pending" ? (
              <ClockIcon className="size-4" />
            ) : (
              <IoClose className="size-4" />
            )}{" "}
            <span>{product.status}</span>
          </div>
        );
      case "action":
        return (
          <div className="text-sm flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedForm({
                  title: "Update Product",
                  formId: "update-product-form",
                  product: {
                    productId: product._id,
                    productTitle: product.name,
                    product: product,
                  },
                });
                onOpen();
              }}
            >
              <PencilSquareIcon className="size-5 text-gray-600" />
            </button>
            <button
              onClick={() => {
                setSelectedForm({
                  title: "Delete product",
                  formId: "delete-product-form",
                  product: {
                    productId: product._id,
                    productTitle: product.name,
                  },
                });
                onOpen();
              }}
            >
              <TrashIcon className="size-5 text-primary" />
            </button>
          </div>
        );

      default:
        return product[columnKey as keyof ProductType] as React.ReactNode;
    }
  };
  return (
    <section className="sm:max-w-7xl w-full py-5">
      <div className="flex w-full flex-col gap-4">
        {" "}
        <div className="flex sm:flex-row flex-col gap-4 items-start sm:items-center justify-between w-full">
          <DashboardHeader
            header="Products"
            subHeader="Manage your products, pricing, and availability."
          />
          <Button
            onPress={() => {
              setSelectedForm({
                title: "Add Product",
                formId: "add-product-form",
              });
              onOpen();
            }}
            className="bg-primary text-white font-semibold"
          >
            <PlusIcon className="size-4" /> <span>Add Product</span>
          </Button>
        </div>
        <div className=" rounded-lg  w-full flex flex-col gap-4">
          <div className="flex bg-white rounded-lg p-4 shadow sm:flex-row flex-col sm:items-center  justify-end gap-4">
            <Input
              aria-label="Search for products"
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
              className="w-[160px] capitalize"
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
              <TableColumn key="image" allowsSorting>
                Product
              </TableColumn>
              <TableColumn key="name" allowsSorting>
                Title
              </TableColumn>

              <TableColumn key="price">Price</TableColumn>

              <TableColumn key="stock">Stock</TableColumn>
              <TableColumn key="categories">Categories</TableColumn>
              <TableColumn key="date_create">Date Added</TableColumn>
              <TableColumn key="status">Status</TableColumn>
              <TableColumn key="action">Action</TableColumn>
            </TableHeader>

            <TableBody<ProductType>
              items={products}
              isLoading={isLoadingProducts}
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
        <ProductModal
          selectedForm={selectedForm}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
    </section>
  );
};

export default DashboardProducts;
