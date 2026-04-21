"use client";
import React from "react";
import {
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
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
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/lib/services/user/user.api";
import { ProfileRequest } from "@/types/vendor.types";
interface FormErrors {
  password?: string;
  retryPassword?: string;
}

interface FormData {
  retryPassword: string;
  password: string;
}
const StoreProfile = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();

  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);
  const [isRetryPasswordVisible, setIsRetryPasswordVisible] =
    React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string | null>(null);
  const [retryPassword, setRetryPassword] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState<FormData>({
    password: "",
    retryPassword: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});

  const { data, isLoading } = useGetUserProfileQuery();
  console.log(data);

  const [updateProfile, { isLoading: isLoadingUserProfileUpdate }] =
    useUpdateUserProfileMutation();
  const [fName, setFName] = React.useState<string>(data?.data.fname || "");
  const [department, setDepartment] = React.useState<string>(
    data?.data.department || "",
  );
  // Real-time password validation
  const getPasswordError = (value: string | null) => {
    if (value !== null) {
      if (value.length < 4) {
        return "Password must be 4 characters or more";
      }
      if ((value.match(/[A-Z]/g) || []).length < 1) {
        return "Password needs at least 1 uppercase letter";
      }
      if ((value.match(/[^a-z]/gi) || []).length < 1) {
        return "Password needs at least 1 symbol";
      }
    }

    return null;
  };
  const getRetryPasswordError = (value: string | null) => {
    if (value !== password) {
      return "Passwords don't match";
    }

    return null;
  };

  const handlePersonalInfoUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    console.log("handlePersonalInfoUpdate");
    try {
      const res = await updateProfile({
        formData: { fname: fName, department: department },
      }).unwrap();

      addToast({
        title: "Profilr updated",
        description: res.message,
        color: "success",
      });
      onOpenChange();
    } catch (error: any) {
      addToast({
        title: "Personal update failed",
        description: error?.data?.message || "Something went wrong, try again",
        color: "danger",
      });
      console.log(error);
    }
  };

  // password handler
  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const payload: ProfileRequest = {
        password: formData.get("password") as string,
        retry_password: formData.get("retry_password") as string,
      };

      const res = await updateProfile({
        formData: payload,
      }).unwrap();

      addToast({
        title: "Store updated",
        description: res.message,
        color: "success",
      });
    } catch (error: any) {
      addToast({
        title: "Personal update failed",
        description: error?.data?.message || "Something went wrong, try again",
        color: "danger",
      });
      console.log(error);
    }
  };
  return (
    <section className="w-full flex flex-col gap-10 sm:pt-10 pt-5">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold capitalize">My Profile</h1>
        <p className="text-gray-600 sm:w-[350px]">
          Update information and change account password.
        </p>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <div className="flex sm:flex-row flex-col items-start gap-10">
          <div className="bg-white p-4 shadow rounded-lg sm:w-1/2 w-full">
            <h2 className="text-xl font-extrabold capitalize border-b-1 border-gray-200 pb-3 mb-4">
              Personal Details
            </h2>
            <div className="flex items-start justify-between">
              <div className="text-sm flex flex-col gap-4">
                <div>
                  <strong className="">Name</strong>
                  <p>
                    {data?.data.fname ? (
                      data?.data.fname
                    ) : (
                      <span className="flex items-center text-primary">
                        <ExclamationTriangleIcon className="size-4" />{" "}
                        <span>Update name</span>
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <strong className="">Email</strong>
                  <p>{session?.user.email}</p>
                </div>
                <div>
                  <strong className="">Phone</strong>
                  <p>{data?.data?.phone}</p>
                </div>
                <div>
                  <strong className="">Department</strong>
                  <p>
                    {data?.data.department ? (
                      data?.data.department
                    ) : (
                      <span className="flex items-center text-primary">
                        <ExclamationTriangleIcon className="size-4" />{" "}
                        <span>Update name</span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
              {/* Edit profile form  */}
              <button onClick={onOpen}>
                <PencilSquareIcon className="size-6 text-primary" />
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
                        <h3 className="text-lg font-semibold">
                          Profile update
                        </h3>
                        <p className="text-sm text-default-500">
                          Reg / Matric No. can not be changed without campus
                          admin. Changes of phone number will need verification.
                        </p>
                      </ModalHeader>
                      <ModalBody>
                        <Form
                          className="w-full space-y-6"
                          onSubmit={handlePersonalInfoUpdate}
                          id="update-user-form"
                        >
                          {" "}
                          <Input
                            aria-label="Name"
                            value={fName || data?.data.fname}
                            placeholder="Enter fullame"
                            name="fname"
                            type="text"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                              console.log(fName);

                              setFName(e.target.value);
                            }}
                          />
                          <Input
                            aria-label="user department"
                            value={department || data?.data.department}
                            placeholder="Enter Department"
                            name="department"
                            type="text"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                              console.log(fName);

                              setDepartment(e.target.value);
                            }}
                          />
                        </Form>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          form="update-user-form" // ðŸ”¥ connects to form
                          className="bg-primary text-white font-semibold"
                        >
                          Update profile
                          {isLoadingUserProfileUpdate && (
                            <Spinner
                              size="sm"
                              variant="spinner"
                              color="white"
                            />
                          )}
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
          <div className="bg-white p-4 shadow rounded-lg sm:w-1/2 w-full">
            <h2 className="text-xl font-extrabold capitalize border-b-1 border-gray-200 pb-3 mb-3">
              Reset Password
            </h2>
            <Form
              className="w-full justify-center items-center  "
              onSubmit={handlePasswordUpdate}
            >
              <div className="flex flex-col gap-4 w-full">
                <Input
                  isRequired
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-solid outline-transparent"
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <EyeSlashIcon className="size-4" />
                      ) : (
                        <EyeIcon className="size-4" />
                      )}
                    </button>
                  }
                  errorMessage={getPasswordError(password)}
                  isInvalid={getPasswordError(password) !== null}
                  label="Password"
                  labelPlacement="outside"
                  name="password"
                  placeholder="Enter your password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password || ""}
                  onValueChange={setPassword}
                />

                <Input
                  isRequired
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-solid outline-transparent"
                      type="button"
                      onClick={() =>
                        setIsRetryPasswordVisible(!isRetryPasswordVisible)
                      }
                    >
                      {isRetryPasswordVisible ? (
                        <EyeSlashIcon className="size-4" />
                      ) : (
                        <EyeIcon className="size-4" />
                      )}
                    </button>
                  }
                  label="Retry Password"
                  labelPlacement="outside"
                  name="retry_password"
                  placeholder="Retry password"
                  type={isRetryPasswordVisible ? "text" : "password"}
                  value={retryPassword || ""}
                  onValueChange={setRetryPassword}
                />

                {errors && (
                  <span className="text-danger text-small">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="flex gap-4 justify-end w-full">
                <Button
                  className=" flex items-center bg-[#ed1d3e] text-white"
                  type="submit"
                >
                  <p>Submit</p>
                  {isLoadingUserProfileUpdate && (
                    <Spinner size="sm" variant="spinner" color="white" />
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </section>
  );
};

export default StoreProfile;
