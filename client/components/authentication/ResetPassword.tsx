"use client";

import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

interface FormErrors {
  password?: string;
  retryPassword?: string;
}

interface FormData {
  retryPassword: string;
  password: string;
}

const ResetPassword = () => {
  const params = useSearchParams();
  const getUserEmail = params.get("email");
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);
  const [isRetryPasswordVisible, setIsRetryPasswordVisible] =
    React.useState<boolean>(false);
  const [password, setPassword] = React.useState("");
  const [retryPassword, setRetryPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState<FormData>({
    password: "",
    retryPassword: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});

  // Real-time password validation
  const getPasswordError = (value: string) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };
  const getRetryPasswordError = (value: string) => {
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

    console.log(data.password, data.retryPassword, getUserEmail);

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
    <section>
      <div className="flex justify-center my-4">
        {" "}
        <p className="text-sm  font-medium text-center w-[80%]">
          Update your password and login again.
        </p>
      </div>
      <Form
        className="w-full justify-center items-center space-y-4 bg-white p-6 rounded-2xl shadow"
        onSubmit={onSubmit}
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
            value={password}
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
            value={retryPassword}
            onValueChange={setRetryPassword}
          />

          {errors && (
            <span className="text-danger text-small">{errors.password}</span>
          )}

          <div className="flex gap-4">
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
    </section>
  );
};

export default ResetPassword;
