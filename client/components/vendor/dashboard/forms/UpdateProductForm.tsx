"use client";
import React, { useState } from "react";
import { Form, Input, SelectItem, Textarea, Select } from "@heroui/react";
import ProductImageUpload from "./ProductImageUpload";

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
const UpdateProductForm = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  const handleProductUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New product submitted");
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
      />
      <Textarea
        isRequired
        className="w-full"
        label="Description"
        name="description"
        labelPlacement="outside"
        placeholder="Enter your description"
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
      />
      <Input
        isRequired
        errorMessage="At least 1 product item should be available"
        label="Stock"
        name="stock"
        labelPlacement="outside"
        placeholder="In stock"
        defaultValue="1"
        type="number"
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
        >
          {CATEGORIES.map((category) => (
            <SelectItem key={category.key}>{category.label}</SelectItem>
          ))}
        </Select>
      </div>
    </Form>
  );
};

export default UpdateProductForm;
