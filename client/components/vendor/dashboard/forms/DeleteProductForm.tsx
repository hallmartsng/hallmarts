"use client";
import React from "react";
import { Form } from "@heroui/react";

interface DeleteProductFormProps {
  title: string;
  id: string;
}
const DeleteProductForm = ({ title, id }: DeleteProductFormProps) => {
  const handleProductDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(" product deleted", id);
  };
  return (
    <Form
      id="delete-product-form"
      className="w-full flex flex-col gap-4"
      onSubmit={handleProductDelete}
    >
      <div>
        <p>Are you sure you want to delete product ?</p>
        <p>{title}</p>
      </div>
    </Form>
  );
};

export default DeleteProductForm;
