"use client";
import React from "react";
import { addToast, Form } from "@heroui/react";
import { useDeleteProductMutation } from "@/lib/services/vendor/products.api";

interface DeleteProductFormProps {
  title: string;
  id: string;
  setIsLoading: (value: boolean) => void;
  onOpenChange: () => void;
}
const DeleteProductForm = ({
  title,
  id,
  setIsLoading,
  onOpenChange,
}: DeleteProductFormProps) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const handleProductDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await deleteProduct(id).unwrap();

      if (res.success) {
        addToast({
          title: "Product deleted",
          description: res.message,
          color: "success",
        });
      }
      onOpenChange();
    } catch (error) {
      console.log(" product deleted", error);
      addToast({
        title: "Something went wrong",
        description: `Falied to upload product`,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form
      id="delete-product-form"
      className="w-full flex flex-col gap-4"
      onSubmit={handleProductDelete}
    >
      <div>
        <p>Are you sure you want to delete product ?</p>
        <p className="font-bold">{title}</p>
      </div>
    </Form>
  );
};

export default DeleteProductForm;
