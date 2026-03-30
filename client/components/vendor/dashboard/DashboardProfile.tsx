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
  file: File;
  url: string;
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

  const [uploadedImage, setUploadedImage] =
    React.useState<ImagePreview | null>();

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
    console.log("handleSelect: ", files);
    if (!files) return;

    setUploadedImage({
      file: files[0],
      url: URL.createObjectURL(files[0]),
    });
  };

  const removeImage = () => {
    setUploadedImage(null);
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

              {/* Delete Icon */}
              {uploadedImage?.url && (
                <button
                  type="button"
                  onClick={() => removeImage()}
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black"
                >
                  <TrashIcon className="size-4" />
                </button>
              )}
            </div>
          </div>
          {/* Upload Button */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="p-2 gap-1 rounded-lg border border-dashed text-sm text-gray-500 hover:border-gray-400 items-center flex w-auto"
          >
            <CloudArrowDownIcon className="size-5" />
            <span>Upload Image</span>
          </button>

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
                value={"vendor@hallmarts.com"}
                name="email"
                type="text"
              />

              <Input
                isDisabled
                aria-label="Name"
                value={"Micheal Essien"}
                name="name"
                type="text"
              />
              <Input
                isDisabled
                aria-label="Phone"
                value={"+234 904 7298 782"}
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
                aria-label="Store name"
                value={"Shillola"}
                name="store_name"
                type="text"
                placeholder="Store name"
              />

              <Input
                aria-label="Campus"
                value={"Bells University"}
                name="campus"
                type="text"
              />
              <Input
                aria-label="Location"
                value={"Lagos state"}
                name="location"
                type="text"
              />
              <Input
                aria-label="delivery areas"
                value={"unilag, unical, uniben, cu"}
                name="delivery_areas"
                type="text"
              />
            </div>
            <Textarea
              aria-label="Store description"
              value={"Welcome to my store i sell affordable perfumes"}
              name="description"
              type="text"
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
