"use client";

import React from "react";
import {
  addToast,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import FilterCampuses from "@/components/FilterCampus";
import { StoreCategoryIconsTypes } from "../StoreCategoryIcons";

type CategoriesType = {
  title: string;
  title_id: StoreCategoryIconsTypes;
  id: string;
};
const StoreFilterForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [errors, setErrors] = React.useState({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submit...");

    e.preventDefault();

    const form = new FormData(e.currentTarget);

    // const payload: CreateProjectRequest = {
    //   name: form.get("name") as string,
    //   client: form.get("client") as string,
    //   email: form.get("email") as string,
    //   phoneNum: form.get("phoneNum") as string,
    //   serviceType: form.get("serviceType") as string,
    //   assignedTo: form.get("assignedTo") as string, // will be set in backend for now
    //   budget: Number(form.get("budget")),
    //   location: {
    //     state: form.get("state") as string,
    //     address: "Address not included",
    //   },
    //   startDate: form.get("startDate") as string,
    //   endDate: form.get("endDate") as string,
    // };
    console.log("payload: ", form);

    try {
      // const res = await createProject(payload).unwrap();
      // console.log(res);

      addToast({
        title: "Search completed",
        description: "120 results found",
        color: "success",
      });

      setErrors({});
      onOpenChange();
    } catch (error) {
      console.log(error);
    }
  };

  const CATEGORIES: CategoriesType[] = [
    {
      title: "phones & tablets",
      title_id: "phones",
      id: "77486554849933773",
    },
    {
      title: "Health & beauty",
      title_id: "health",
      id: "77555554849933773",
    },
    {
      title: "electronics",
      title_id: "electronics",
      id: "775599854849933773",
    },
    {
      title: "fashion",
      title_id: "fashion",
      id: "775599854800933773",
    },
    {
      title: "gaming",
      title_id: "gaming",
      id: "775539354800933773",
    },
    {
      title: "academics",
      title_id: "academics",
      id: "775590954800933773",
    },
  ];
  return (
    <div className="sm:w-auto w-full flex justify-end">
      <button
        onClick={onOpen}
        className="flex justify-center gap-2 items-center bg-white sm:w-28 w-8 h-8 p-2 rounded-md font-semibold"
      >
        <FunnelIcon className="sm:size-5 size-10" />
        <p className="font-medium sm:flex hidden">Filter by</p>
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">Product Filter</h3>
                <p className="text-sm text-default-500">
                  Filter by campus, vendor, product ...
                </p>
              </ModalHeader>
              <ModalBody>
                <Form
                  className="w-full space-y-6"
                  validationErrors={errors}
                  onSubmit={onSubmit}
                  id="new-project-form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* campus */}
                    <FilterCampuses
                      isRequired={false}
                      code={"NG"}
                      name={"campus"}
                    />
                    {/* Vendor */}
                    <Input
                      label="Vendor"
                      labelPlacement="outside"
                      name="vendor"
                      placeholder="Enter vendor name"
                    />

                    {/* Category  */}
                    <div className="w-full">
                      <Select
                        label="Category"
                        labelPlacement="outside"
                        name="category"
                        placeholder="Select category"
                      >
                        {CATEGORIES.map((category) => {
                          return (
                            <SelectItem key={category.title_id}>
                              {category.title}
                            </SelectItem>
                          );
                        })}
                      </Select>
                    </div>

                    {/* Budget */}
                    <NumberInput
                      hideStepper
                      type="number"
                      label="Budget"
                      labelPlacement="outside"
                      name="budget"
                      formatOptions={{
                        style: "currency",
                        currency: "NGN",
                      }}
                      placeholder="Enter product budget"
                      min={1500}
                      defaultValue={0}
                    />
                  </div>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="new-project-form" // ðŸ”¥ connects to form
                  className="bg-primary text-white font-semibold"
                >
                  Filter
                  {/* {isLoading && (
                    <Spinner size="sm" variant="spinner" color="white" />
                  )} */}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default StoreFilterForm;
