"use client";
import React from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Button, Form, Input } from "@heroui/react";
interface FormErrors {
  password?: string;
  retryPassword?: string;
}

interface FormData {
  retryPassword: string;
  password: string;
}
const StoreProfile = () => {
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as unknown as FormData;

    console.log(data.password, data.retryPassword);

    // Custom validation checks
    const newErrors: FormErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
    console.log(submitted);
  };
  return (
    <section className="w-full flex flex-col gap-10 sm:pt-10 pt-5">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold capitalize">My Profile</h1>
        <p className="text-gray-600 sm:w-[350px]">
          Update information and change account password.
        </p>
      </div>

      <div className="flex sm:flex-row flex-col items-center gap-10">
        <div className="bg-white p-4 shadow rounded-lg sm:w-1/2 w-full">
          <h2 className="text-xl font-extrabold capitalize border-b-1 border-gray-200 pb-3 mb-4">
            Personal Details
          </h2>
          <div className="flex items-start justify-between">
            <div className="text-sm flex flex-col gap-4">
              <div>
                <strong className="">Name</strong>
                <p>John doe</p>
              </div>
              <div>
                <strong className="">Email</strong>
                <p>example@gmial.com</p>
              </div>
              <div>
                <strong className="">Phone</strong>
                <p>+234 909 6736 893</p>
              </div>
            </div>
            <div>
              <PencilSquareIcon className="size-6 text-primary" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg sm:w-1/2 w-full">
          <h2 className="text-xl font-extrabold capitalize border-b-1 border-gray-200 pb-3 mb-3">
            Reset Password
          </h2>
          <Form
            className="w-full justify-center items-center space-y-2"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-3 w-full items-start">
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
                aria-label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter new password"
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
                aria-label="retry Password"
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

              <div className="flex">
                <Button
                  className="w-full flex items-center bg-[#ed1d3e] text-white"
                  type="submit"
                >
                  <p>Update password</p>
                  {/* <Spinner size="sm" variant="spinner" color="white" /> */}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default StoreProfile;
