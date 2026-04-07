import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import NewProductForm from "./NewProductForm";
import UpdateProductForm from "./UpdateProductForm";
import DeleteProductForm from "./DeleteProductForm";
import { ImagePreview } from "@/types";

type ProductType = {
  _id: string;
  name: string;
  price: number;
  imgUrl: ImagePreview | null;
  stock: number;
  date_create: string;
  categories: string[];
  status: string;
  description: string;
};
interface SelectedFormProps {
  title: string;
  formId: string;
  product?: {
    productId: string;
    productTitle: string;
    product?: ProductType;
  };
}
interface ProductModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedForm: SelectedFormProps;
}
const ProductModal = ({
  onOpenChange,
  isOpen,
  selectedForm,
}: ProductModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      {" "}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedForm.title}
              </ModalHeader>
              <ModalBody>
                {selectedForm.formId === "add-product-form" && (
                  <NewProductForm
                    setIsLoading={setIsLoading}
                    onOpenChange={onOpenChange}
                  />
                )}
                {selectedForm.formId === "update-product-form" && (
                  <UpdateProductForm
                    title={selectedForm.product?.productTitle || ""}
                    product={
                      selectedForm.product?.product
                        ? selectedForm.product?.product
                        : null
                    }
                  />
                )}
                {selectedForm.formId === "delete-product-form" && (
                  <DeleteProductForm
                    title={selectedForm.product?.productTitle || ""}
                    id={selectedForm.product?.productId || ""}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  form={selectedForm.formId}
                  color="primary"
                  type="submit"
                >
                  {selectedForm.title}
                  {isLoading && (
                    <Spinner size="sm" variant="spinner" color="white" />
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;
