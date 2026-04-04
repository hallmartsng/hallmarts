"use client";
import React, { useRef } from "react";
import DashboardHeader from "./DashboardHeader";
import { Button, Form, Input, Textarea } from "@heroui/react";
import {
  CloudArrowDownIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useGetVendorProfileQuery } from "@/lib/services/vendor/vendor.api";

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
  file: File | string;
  url: string;
};
const DashboardProfile = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data } = useGetVendorProfileQuery();

  const [errors, setErrors] = React.useState<StoreInfoFormErrors>({});
  const [password, setPassword] = React.useState<string | null>(null);
  const [storeName, setStoreName] = React.useState<string | null>(
    data?.data.store_name || null,
  );
  const [retryPassword, setRetryPassword] = React.useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);
  const [isRetryPasswordVisible, setIsRetryPasswordVisible] =
    React.useState<boolean>(false);

  const [uploadedImage, setUploadedImage] = React.useState<ImagePreview | null>(
    data?.data.store_logo
      ? { file: data.data.store_logo, url: data.data.store_logo }
      : null,
  );

  console.log("Data: ", data);

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
      file: "",
      url: "",
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handlePersonalInfoUpdate = () => {
    console.log("handlePersonalInfoUpdate");
  };
  const handlePasswordUpdate = () => {
    console.log("handlePersonalInfoUpdate");
  };
  const handleBrandLogoUpdate = () => {
    console.log("handlePersonalInfoUpdate");
  };

  return (
    <section className="sm:max-w-7xl w-full py-5 flex flex-col gap-4">
      <DashboardHeader
        header="Profile Settings"
        subHeader="Manage your account and store details."
      />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
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
                    : "/image-upload-image-fallback.png"
                }
                alt="brand logo"
                className="h-full w-full object-cover rounded-full"
                width={50}
                height={50}
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
                  {/* <Spinner size="sm" variant="spinner" color="white" /> */}
                </Button>
                <button
                  type="button"
                  onClick={() => removeImage()}
                  className="rounded-xl flex items-center px-2 text-sm gap-1 justify-center bg-black/60 h-10 w-auto text-white hover:bg-black"
                >
                  <TrashIcon className="size-5" />
                  Delete
                </button>
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
                value={data?.data.fname || ""}
                placeholder="Enter fullame"
                name="name"
                type="text"
              />
              <Input
                isDisabled
                aria-label="Phone"
                value={data?.data.phone || ""}
                name="phone"
                type="text"
              />

              <div className="flex gap-4">
                <Button
                  className="w-full flex items-center bg-[#ed1d3e] text-white"
                  type="submit"
                >
                  <p>Submit</p>
                  {/* <Spinner size="sm" variant="spinner" color="white" /> */}
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
            onSubmit={handlePersonalInfoUpdate}
          >
            <div className="grid mb-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
              <Input
                isDisabled={data?.data.store_name ? true : false}
                aria-label="Store name"
                value={storeName || ""}
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
              {/* <Input
                aria-label="Location"
                value={"Lagos state"}
                name="location"
                type="text"
              /> */}
              {/* <Input
                aria-label="delivery areas"
                value={"unilag, unical, uniben, cu"}
                name="delivery_areas"
                type="text"
              /> */}
            </div>
            <Textarea
              aria-label="Store description"
              value={data?.data.store_description}
              name="description"
              type="text"
              placeholder="Tell your customers more about your store"
              className="w-full col-span-12"
            />
            {errors && (
              <span className="text-danger text-small">{errors.campus}</span>
            )}
            <div className="flex gap-4 justify-end w-full">
              <Button
                className=" flex items-center bg-[#ed1d3e] text-white"
                type="submit"
              >
                <p>Submit</p>
                {/* <Spinner size="sm" variant="spinner" color="white" /> */}
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
                errorMessage={getRetryPasswordError(retryPassword)}
                isInvalid={getRetryPasswordError(retryPassword) !== null}
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
                {/* <Spinner size="sm" variant="spinner" color="white" /> */}
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
      </div>
    </section>
  );
};

export default DashboardProfile;
