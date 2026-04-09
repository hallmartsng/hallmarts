"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  SelectItem,
  Textarea,
  Select,
  addToast,
} from "@heroui/react";
import ProductImageUpload from "./ProductImageUpload";
import { ImagePreview } from "@/types";
import { useUpdateProductMutation } from "@/lib/services/vendor/products.api";
import { ProductRequest } from "@/types/product.types";

interface FormErrors {
  title?: string;
  price?: string;
  categories?: string;
  stock?: string;
}
const CATEGORIES = [
  { key: "electronics", label: "Electronics" },
  { key: "fashion", label: "Fashion" },
  { key: "accessories", label: "Accessories" },
  { key: "beauty", label: "Beauty & Personal Care" },
  { key: "food", label: "Food & Snacks" },
  { key: "beverages", label: "Beverages" },
  { key: "stationery", label: "Stationery" },
  { key: "books", label: "Books" },
  { key: "gadgets", label: "Gadgets" },
  { key: "home", label: "Home & Living" },
  { key: "sports", label: "Sports & Fitness" },
  { key: "health", label: "Health & Wellness" },
];

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

interface ProductFormValues {
  title?: string;
  price?: string;
  categories?: string;
  stock?: string;
  description?: string;
  visible?: boolean;
}
interface UpdateProductFormProps {
  product: ProductType | null;
  setIsLoading: (value: boolean) => void;
  onOpenChange: () => void;
}
const UpdateProductForm = ({
  product,
  setIsLoading,
  onOpenChange,
}: UpdateProductFormProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [productCategories, setProductCategories] = useState<string[]>([]);

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [title, setTitle] = useState<string>(product?.name || "");
  const [description, setDescription] = useState<string>(
    product?.description || "",
  );
  const [price, setPrice] = useState<string>(`${product?.price}` || "");
  const [stock, setStock] = useState<string>(`${product?.stock}` || "");

  const handleProductUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const data = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as ProductFormValues;

    console.log(data);

    const newErrors: FormErrors = {};

    const productId = product?._id ?? "";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const payload: ProductRequest = {
      title: title,
      description: description,
      price: Number(price),
      stock: Number(stock),
      categories: productCategories,
      status: product?.status ?? "pending",
    };
    try {
      const updateProductRes = await updateProduct({
        productId: productId,
        body: payload,
      }).unwrap();

      if (updateProductRes.success) {
        addToast({
          title: "Product Updated",
          description: updateProductRes.message,
          color: "success",
        });
      }
    } catch (error) {
      addToast({
        title: "Something went wrong",
        description: "Can not update product, try again.",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
      onOpenChange(); // close modal
    }
  };

  return (
    <Form
      id="update-product-form"
      className="w-full flex flex-col gap-4"
      onSubmit={handleProductUpdate}
      validationErrors={errors.title ? { name: errors.title } : {}}
    >
      <Input
        isRequired
        errorMessage="Please enter product title"
        label="Title"
        labelPlacement="outside"
        name="title"
        placeholder="Enter product title"
        type="text"
        value={title || product?.name}
        onValueChange={setTitle}
      />
      <Textarea
        isRequired
        className="w-full"
        label="Description"
        name="description"
        labelPlacement="outside"
        placeholder="Enter your description"
        value={description || product?.description}
        onValueChange={setDescription}
      />
      <Input
        isRequired
        errorMessage="Please enter price"
        label="Price"
        name="price"
        labelPlacement="outside"
        placeholder="0.00"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">₦</span>
          </div>
        }
        type="number"
        value={price || `${product?.price}`}
        onValueChange={setPrice}
      />
      <Input
        isRequired
        errorMessage="At least 1 product item should be available"
        label="Stock"
        name="stock"
        labelPlacement="outside"
        placeholder="In stock"
        defaultValue="1"
        min={1}
        type="number"
        value={stock || `${product?.stock}`}
        onValueChange={setStock}
      />
      <div className="-mt-6 w-full">
        <Select
          label="Category"
          labelPlacement="outside"
          name="categories"
          placeholder="Select category"
          errorMessage="Select category"
          className="mb-3"
          selectionMode="multiple"
          onSelectionChange={(keys) => {
            if (keys.currentKey !== undefined) {
              setProductCategories((prevs) => [
                ...prevs,
                keys.currentKey as string,
              ]);
            }
          }}
        >
          {CATEGORIES.map((category) => (
            <SelectItem key={category.key}>{category.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 font-semibold capitalize">
        {product?.categories.map((category) => {
          return <span key={category}>{category}</span>;
        })}
      </div>
    </Form>
  );
};

export default UpdateProductForm;
