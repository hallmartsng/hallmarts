import {
  ArrowRightIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import Link from "next/link";
import React from "react";

interface CampusCalendarModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}
const CampusCalendarModal = ({
  onOpenChange,
  isOpen,
}: CampusCalendarModalProps) => {
  return (
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
              <h1>Add Event</h1>
              <p className="font-light text-sm">
                By creating an event, you let everyone on campus know
                what&apos;s coming up.
              </p>
            </ModalHeader>
            <ModalBody>
              <Alert
                icon={<ShieldExclamationIcon className="size-4" />}
                color={"warning"}
                title={`You are almost there, to add an event you need to have minimum of 4 star ratings as a vendor.`}
                // endContent={
                //   <button>
                //     <ArrowRightIcon className="size-4" />
                //   </button>
                // }
              />
              <Link href={"/"} className="text-xs text-primary underline">
                Learn how to boost star rating
              </Link>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {/* <Button color="primary" type="submit">
                Submit
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CampusCalendarModal;
