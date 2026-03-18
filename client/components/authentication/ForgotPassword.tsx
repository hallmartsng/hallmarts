"use client";
import React from "react";
import { Form, Input, Button, addToast, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
}
const ForGotPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as unknown as FormData;

    try {
      setIsLoading(true);
      // 1️⃣ Register user
      //  const res = await registerUser(data);
      const res = {
        message: "Registration successful",
      };
      console.log(data);
      addToast({
        title: "Sign Up",
        description: res.message,
        color: "success",
      });

      setIsLoading(false);
      // const {email} = data
      router.push(`/authentication/otp?email=${data.email}`);
    } catch (err: any) {
      addToast({
        title: "Error occured",
        description: err.message,
        color: "danger",
      });
    }
    setIsLoading(false);
  };
  return (
    <section>
      <div className="flex justify-center my-4">
        {" "}
        <p className="text-sm  font-medium text-center w-[80%]">
          Enter a valid email and receive an OTP.
        </p>
      </div>
      <Form
        className="w-full justify-center items-center space-y-4 bg-white p-6 rounded-2xl shadow"
        onReset={() => console.log("Form reset")}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 w-full">
          <Input
            isRequired
            errorMessage={({
              validationDetails,
            }: {
              validationDetails: ValidityState;
            }) => {
              if (validationDetails.valueMissing) {
                return "Please enter your email";
              }
              if (validationDetails.typeMismatch) {
                return "Please enter a valid email address";
              }
              return;
            }}
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
          <div className="flex gap-4">
            <Button
              className="w-full flex items-center bg-[#ed1d3e] text-white"
              type="submit"
              disabled={isLoading}
            >
              <p>Send OTP</p>
              {isLoading && (
                <Spinner size="sm" variant="spinner" color="white" />
              )}
            </Button>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default ForGotPassword;
