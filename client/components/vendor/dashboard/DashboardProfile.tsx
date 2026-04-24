"use client";
import React, { useEffect, useRef } from "react";
import DashboardHeader from "./DashboardHeader";
import {
  addToast,
  Button,
  Form,
  Input,
  Spinner,
  Textarea,
} from "@heroui/react";
import {
  CloudArrowDownIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import {
  useGetVendorProfileQuery,
  useUpdateVendorProfileMutation,
  useUploadStoreLogoMutation,
} from "@/lib/services/vendor/vendor.api";
import { VendorProfileUpdateRequest } from "@/types/vendor.types";

interface StoreInfoFormErrors {
  store_name?: string;
  description?: string;
  campus?: string;
  location?: string;
  delivery_areas?: string;
  password?: string;
  retryPassword?: string;
}

type ImagePreview = {
  file: File | null;
  url: string;
  public_id?: string;
};
const DashboardProfile = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = React.useState<StoreInfoFormErrors>({});
  const [password, setPassword] = React.useState<string | null>(null);

  const [retryPassword, setRetryPassword] = React.useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);
  const [isRetryPasswordVisible, setIsRetryPasswordVisible] =
    React.useState<boolean>(false);

  const { data, isLoading: isLoadingProfile } = useGetVendorProfileQuery();
  const [uploadLogo, { isLoading: isLoadingLogoUpload }] =
    useUploadStoreLogoMutation();

  const [updateProfile, { isLoading: isLoadingVendorProfileUpdate }] =
    useUpdateVendorProfileMutation();

  const [uploadedImage, setUploadedImage] = React.useState<ImagePreview | null>(
    data?.data.store_logo?.url
      ? { file: null, url: data.data.store_logo.url }
      : null,
  );

  const [fName, setFName] = React.useState<string>(data?.data.fname || "");
  const [storeName, setStoreName] = React.useState<string>(
    data?.data.store_name || "",
  );
  const [storeDesc, setStoreDesc] = React.useState<string>(
    data?.data.store_description || "",
  );
  const [department, setDepartment] = React.useState<string>(
    data?.data.department || "",
  );

  const [isLoadingPersonalInfo, setIsLoadingPersonalInfo] =
    React.useState<boolean>(false);
  const [isLoadingStoreInfo, setIsLoadingStoreInfo] =
    React.useState<boolean>(false);
  const [isLoadingPasswordChange, setIsLoadingPasswordChange] =
    React.useState<boolean>(false);

  console.log("Data: ", data?.data);

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

  const handleSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    setUploadedImage({
      file,
      url: URL.createObjectURL(file),
    });
  };

  const removeImage = () => {
    setUploadedImage({
      file: null,
      url: "",
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Logo handler
  const handleBrandLogoUpdate = async () => {
    if (!uploadedImage?.file) return;

    try {
      const formData = new FormData();
      formData.append("logo", uploadedImage.file);

      const res = await uploadLogo({
        uploadedLogo: formData,
      }).unwrap();

      addToast({
        title: "Image uploaded",
        description: res.message,
        color: "success",
      });

      console.log("Logo uploaded successfully");
    } catch (error: any) {
      addToast({
        title: "Image upload failed",
        description: error?.data?.message || "Something went wrong, try again",
        color: "danger",
      });
      console.log(error);
    }
  };

  // Personal info handler
  const handlePersonalInfoUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    console.log("handlePersonalInfoUpdate");
    try {
      setIsLoadingPersonalInfo(isLoadingVendorProfileUpdate);
      const res = await updateProfile({
        formData: { fname: fName, department: department },
      }).unwrap();

      addToast({
        title: "Personal updated",
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
    } finally {
      setIsLoadingPersonalInfo(isLoadingVendorProfileUpdate);
    }
  };

  // Store info handler
  const handleStoreInfoUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoadingStoreInfo(isLoadingVendorProfileUpdate);
      const formData = new FormData(e.currentTarget);
      const payload: VendorProfileUpdateRequest = {
        store_name:
          (formData.get("store_name") as string) || data?.data.store_name,
        store_description: formData.get("store_description") as string,
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
    } finally {
      setIsLoadingStoreInfo(isLoadingVendorProfileUpdate);
    }
  };

  // password handler
  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoadingPasswordChange(isLoadingVendorProfileUpdate);
      const formData = new FormData(e.currentTarget);
      const payload: VendorProfileUpdateRequest = {
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
    } finally {
      setIsLoadingPasswordChange(isLoadingVendorProfileUpdate);
    }
  };

  return (
    <section className="sm:max-w-7xl w-full py-5 flex flex-col gap-4">
      <DashboardHeader
        header="Profile Settings"
        subHeader="Manage your account and store details."
      />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {!isLoadingProfile && (
          <>
            {/* Store logo  */}
            <div className="bg-white rounded-lg p-4 shadow space-y-4">
              <h1 className="sm:text-lg font-semibold">Branding</h1>
              <p className="text-gray-600 text-sm">
                Upload an image of your business logo to keep your customers
                visually comfortable
              </p>
              {/* <ul>
            <li>Store logo: </li>
            <li>Store Banner: </li>
          </ul> */}
              <div className="relative space-y-3">
                <div className="relative w-32 h-32 rounded-full">
                  <Image
                    src={
                      uploadedImage?.url
                        ? uploadedImage.url
                        : data?.data.store_logo?.url
                          ? data?.data.store_logo.url
                          : "/image-upload-image-fallback.png"
                    }
                    alt="brand logo"
                    className="h-full w-full object-cover rounded-full"
                    width={100}
                    height={100}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                {uploadedImage?.url ? (
                  <div className="flex items-center gap-4">
                    <Button
                      className="w-auto flex items-center bg-[#ed1d3e] text-white"
                      type="submit"
                      onPress={handleBrandLogoUpdate}
                    >
                      <p>Save logo</p>
                      {isLoadingLogoUpload && (
                        <Spinner size="sm" variant="spinner" color="white" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="p-2 gap-1 rounded-lg border border-dashed text-sm text-gray-500 hover:border-gray-400 items-center flex w-auto"
                  >
                    <CloudArrowDownIcon className="size-5" />
                    <span>Upload Image</span>
                  </button>
                )}
                {uploadedImage?.url && (
                  <button
                    type="button"
                    onClick={() => removeImage()}
                    className="rounded-xl flex items-center px-2 text-sm gap-1 justify-center bg-black/60 h-10 w-auto text-white hover:bg-black"
                  >
                    <TrashIcon className="size-5" />
                    Delete
                  </button>
                )}
              </div>

              <input
                ref={inputRef}
                type="file"
                multiple={false}
                accept="image/*"
                hidden
                onChange={(e) => {
                  handleSelect(e.target.files);
                }}
              />
            </div>
            {/* Personal info  */}
            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 shadow">
              <h1 className="sm:text-lg font-semibold">Personal Info</h1>
              <Form
                className="w-full justify-center items-center space-y-4"
                onSubmit={handlePersonalInfoUpdate}
              >
                <div className="flex flex-col items-end gap-4 w-full">
                  <Input
                    isDisabled
                    aria-label="Email"
                    value={data?.data.email || ""}
                    name="email"
                    type="text"
                  />

                  <Input
                    aria-label="Name"
                    value={fName || data?.data.fname}
                    placeholder="Enter fullame"
                    name="fname"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log(fName);

                      setFName(e.target.value);
                    }}
                  />
                  <Input
                    isDisabled
                    aria-label="Phone"
                    value={data?.data.phone}
                    name="phone"
                    type="text"
                  />
                  <Input
                    aria-label="vendor department"
                    value={department || data?.data.department}
                    placeholder="Enter Department"
                    name="department"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log(fName);

                      setDepartment(e.target.value);
                    }}
                  />

                  <div className="flex gap-4">
                    <Button
                      className="w-full flex items-center bg-[#ed1d3e] text-white"
                      type="submit"
                    >
                      <p>Submit</p>
                      {isLoadingPersonalInfo && (
                        <Spinner size="sm" variant="spinner" color="white" />
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            </div>

            {/* Store info  */}
            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 shadow">
              <h1 className="sm:text-lg font-semibold">Store Info</h1>
              <Form
                className="w-full justify-center items-center"
                onSubmit={handleStoreInfoUpdate}
              >
                <div className="grid mb-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
                  <Input
                    isDisabled={data?.data.store_name ? true : false}
                    aria-label="Store name"
                    value={storeName || data?.data.store_name}
                    name="store_name"
                    type="text"
                    placeholder="Store name"
                    onValueChange={setStoreName}
                  />

                  <Input
                    isDisabled={data?.data.campus ? true : false}
                    aria-label="Campus"
                    value={data?.data.campus}
                    name="campus"
                    type="text"
                  />
                </div>
                <Textarea
                  aria-label="Store description"
                  value={storeDesc || data?.data.store_description}
                  name="store_description"
                  type="text"
                  placeholder="Tell your customers more about your store"
                  className="w-full col-span-12"
                  onValueChange={setStoreDesc}
                />
                {errors && (
                  <span className="text-danger text-small">
                    {errors.campus}
                  </span>
                )}
                <div className="flex gap-4 justify-end w-full">
                  <Button
                    className=" flex items-center bg-[#ed1d3e] text-white"
                    type="submit"
                  >
                    <p>Submit</p>
                    {isLoadingStoreInfo && (
                      <Spinner size="sm" variant="spinner" color="white" />
                    )}
                  </Button>
                </div>
              </Form>
            </div>

            {/* Password  */}
            <div className="bg-white rounded-lg p-4 flex flex-col gap-4 shadow">
              <h1 className="sm:text-lg font-semibold">Security</h1>
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
                    {isLoadingPasswordChange && (
                      <Spinner size="sm" variant="spinner" color="white" />
                    )}
                  </Button>
                </div>
              </Form>
              {/* <ul>
            <li>
              Security 2FA{" "}
              <small className="bg-blue-600 rounded-lg flex items-center justify-center px-2 py-1 text-white font-medium">
                Coming soon
              </small>
              :{" "}
            </li>
          </ul> */}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardProfile;
