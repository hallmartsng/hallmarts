"use client";
import React, { FormEvent, useState } from "react";
import {
  Form,
  Input,
  SelectItem,
  Textarea,
  Select,
  addToast,
} from "@heroui/react";
import ProductImageUpload from "./ProductImageUpload";
import { ProductRequest } from "@/types/product.types";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUploadProductImagesMutation,
} from "@/lib/services/vendor/products.api";

interface FormErrors {
  title?: string;
  price?: string;
  categories?: string[];
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

type ImagePreview = {
  file: File;
  url: string;
  coverImage: boolean;
};

interface ProductFormValues {
  title?: string;
  price?: string;
  categories?: string[];
  stock?: string;
  description?: string;
  visible?: boolean;
}

interface NewProductFormProps {
  setIsLoading: (value: boolean) => void;
  onOpenChange: () => void;
}
const NewProductForm = ({
  setIsLoading,
  onOpenChange,
}: NewProductFormProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadedImages, setUploadedImages] = useState<ImagePreview[]>([]);
  const [productCategories, setProductCategories] = useState<string[]>([]);

  const [createProduct, { isLoading: isLoadingCreateProduct }] =
    useCreateProductMutation();
  const [uploadImages, { isLoading: isLoadingImageUpload }] =
    useUploadProductImagesMutation();

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleSelect = (files: FileList | null) => {
    console.log("handleSelect: ", files);

    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      coverImage: false,
    }));

    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const handleCreateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as ProductFormValues;

    const payload: ProductRequest = {
      title: data.title!,
      description: data.description!,
      categories: productCategories,
      price: Number(data.price),
      stock: Number(data.stock),
      status: "pending",
    };
    const newErrors: FormErrors = {};

    if (!data.title || data.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // 1️⃣ create product
      setIsLoading(true);
      const productUploadRes = await createProduct(payload).unwrap();
      if (productUploadRes.success) {
        addToast({
          title: "Product upload",
          description: productUploadRes.message,
          color: "success",
        });
        setUploadedImages([]);
        // setProductCategories([]);
      }

      const productId = productUploadRes.data._id;
      try {
        // 2️⃣ upload images

        setIsLoading(isLoadingImageUpload);
        const formData = new FormData();
        uploadedImages.forEach((img) => {
          if (!img.file) return;

          // Append the file
          formData.append("images", img.file);

          // Append metadata for this file
          formData.append(
            "coverImage",
            JSON.stringify({ coverImage: img.coverImage }),
          );
        });

        const imageUploadRes = await uploadImages({
          productId: productId ? productId : null,
          uploadedImages: formData, // just pass the FormData
        }).unwrap();

        if (imageUploadRes.success) {
          addToast({
            title: "Images upload",
            description: imageUploadRes.message,
            color: "success",
          });
        }
      } catch (error) {
        if (productId) {
          const res = await deleteProduct(productId ?? "").unwrap();

          if (res.success) {
            addToast({
              title: "Product upload failed",
              description: "Please try again.",
              color: "danger",
            });
          }
        }
      }
      onOpenChange();
    } catch (err) {
      console.log("Product creation failed:", err);
      addToast({
        title: "Something went wrong",
        description: `Falied to upload product`,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }

    // ✅ success
  };
  return (
    <Form
      id="add-product-form"
      className="w-full flex flex-col gap-4"
      onSubmit={handleCreateProduct}
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
            <SelectItem key={category.key} textValue={category.label}>
              {category.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <p className="text-black text-xs font-semibold mb-3">
          After uploading multiple images, click on any of the uploaded file to
          set as cover image
        </p>
        <ProductImageUpload
          handleSelect={handleSelect}
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />
      </div>
    </Form>
  );
};

export default NewProductForm;
