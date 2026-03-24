import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import NewProductForm from "./NewProductForm";
import UpdateProductForm from "./UpdateProductForm";
import DeleteProductForm from "./DeleteProductForm";

interface SelectedFormProps {
  title: string;
  formId: string;
  product?: {
    productId: string;
    productTitle: string;
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
                  <NewProductForm />
                )}
                {selectedForm.formId === "update-product-form" && (
                  <UpdateProductForm />
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
