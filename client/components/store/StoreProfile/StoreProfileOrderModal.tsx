import Logo from "@/components/Logo";
import { OrderRequest } from "@/types/order.types";
import nairaSymbol from "@/utils/symbols";
import { UserIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Accordion,
  AccordionItem,
  Image,
} from "@heroui/react";

interface StoreProfileOrderModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedOrder: OrderRequest;
}
const StoreProfileOrderModal = ({
  isOpen,
  onOpenChange,
  selectedOrder,
}: StoreProfileOrderModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-sm  gap-1">
                Delivery status :{" "}
                <span
                  className={`${selectedOrder.orderStatus === "accepted" ? "bg-success-50 text-success" : selectedOrder.orderStatus === "processing" ? "bg-warning-50 text-warning" : "bg-primary-50 text-primary"} capitalize w-[90px] rounded-lg py-1 px-2 flex gap-1 items-center justify-center text-xs`}
                >
                  {selectedOrder.orderStatus}
                </span>{" "}
              </ModalHeader>
              <ModalBody>
                <Accordion defaultExpandedKeys={["1"]}>
                  <AccordionItem
                    key="1"
                    aria-label="Personal details"
                    subtitle={<small>Confirm the information of order.</small>}
                    title={
                      <p className="text-sm font-medium">Personal details</p>
                    }
                  >
                    <div className="text-sm flex flex-col gap-4">
                      <div>
                        <strong className="">Name</strong>
                        <p>{selectedOrder.shippingAddress.name}</p>
                      </div>
                      <div>
                        <strong className="">Email</strong>
                        <p>{selectedOrder.shippingAddress.email}</p>
                      </div>
                      <div>
                        <strong className="">Phone</strong>
                        <p>{selectedOrder.shippingAddress.phone}</p>
                      </div>
                      <div>
                        <strong className="">Address</strong>
                        <p className="capitalize">
                          {selectedOrder.shippingAddress.address}
                        </p>
                      </div>
                    </div>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="A list of all items in your order"
                    subtitle={<small>A list of all items in your order.</small>}
                    title={<p className="text-sm font-medium">Items</p>}
                  >
                    <div className=" bg-white rounded-lg shadow p-4 flex flex-col gap-4">
                      {/* Items  */}
                      {selectedOrder.items.map((item, key) => {
                        return (
                          <div
                            key={key}
                            className="flex items-end justify-between border-b-1 border-gray-200 pb-5"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-[80px]">
                                <Image
                                  alt={`check out product`}
                                  className="w-full object-cover h-[70px]"
                                  radius="lg"
                                  shadow="sm"
                                  src={item.image}
                                  width="100%"
                                />
                              </div>
                              <div className="text-sm">
                                <p>{item.name}</p>
                                <span className="text-gray-500 ">
                                  Qty : {item.quantity}
                                </span>
                              </div>
                            </div>
                            <div className="flex text-gray-500 flex-col gap-2 items-end">
                              <p>{`${nairaSymbol()}${item.price.toLocaleString()}`}</p>
                            </div>
                          </div>
                        );
                      })}
                      {/* Checkout summary  */}
                      <div className="flex flex-col gap-2 text-sm w-full font-medium">
                        <span className="flex text-gray-500 items-center justify-between w-full">
                          <span>Sub total:</span>
                          <span>{`${nairaSymbol()}${selectedOrder.totalPrice.toLocaleString()}`}</span>
                        </span>
                        <span className="flex text-gray-500 items-center justify-between w-full">
                          <span>Discount</span>
                          <span>
                            {`${nairaSymbol()}${selectedOrder?.discount ? selectedOrder?.discount?.toLocaleString() : 0}` ||
                              0}
                          </span>
                        </span>
                        <span className="flex items-center justify-between w-full">
                          <span>Total:</span>
                          <span>{`${nairaSymbol()}${selectedOrder.totalPrice.toLocaleString()}`}</span>
                        </span>
                      </div>
                    </div>
                  </AccordionItem>
                  <AccordionItem
                    key="3"
                    aria-label="Track the status of your delivery."
                    subtitle={<small>Track the status of your delivery.</small>}
                    title={
                      <p className="text-sm font-medium">Delivery status</p>
                    }
                  >
                    <div className="flex items-center justify-between">
                      <UserIcon className="size-5 border-green-400 text-green-400 border rounded-full sm:h-7 sm:w-7 w-8 h-6 p-1" />
                      <div className="border-dashed border-1 border-green-400 w-[100px]" />
                      <div className="border-dashed border-1 border-green-400 rounded-full flex justify-center items-center w-14 p-1 h-14">
                        <Logo />
                      </div>
                      <div className="border-dashed border-1 border-gray-200 w-[100px]" />
                      <span>You</span>
                    </div>
                  </AccordionItem>
                </Accordion>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default StoreProfileOrderModal;
