"use client";
import React, { useState } from "react";
import { Form } from "@heroui/form";
import { InputOtp } from "@heroui/input-otp";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { addToast } from "@heroui/react";
import { useVerifyOTPMutation } from "@/lib/services/authentication/auth.api";

interface FormData {
  otp: number;
  email: string;
}
const Otp = () => {
  const router = useRouter();
  const params = useSearchParams();
  const getUserEmail = params.get("email");
  const [value, setValue] = useState<string>("");

  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 1️⃣ Register user
      const res = await verifyOTP({
        otp: value,
        email: getUserEmail || "",
      }).unwrap();

      console.log(res);
      console.log("res: ", res);
      if (res.success) {
        addToast({
          title: "OTP valid",
          description: res.message,
          color: "success",
        });
        router.push(`/authentication/reset-password?email=${getUserEmail}`);
      }
    } catch (err: any) {
      addToast({
        title: "Error occured",
        description: err?.data.message,
        color: "danger",
      });
    }
  };

  return (
    <section>
      <div className="flex justify-center my-4">
        {" "}
        <p className="text-sm  font-medium text-center w-[80%]">
          Enter the 4 digits pin sent to {getUserEmail}.
        </p>
      </div>
      <Form
        className="w-full justify-center items-center space-y-4 bg-white p-6 rounded-2xl shadow"
        onSubmit={onSubmit}
      >
        <div>
          <h1 className="font-semibold">Enter OTP</h1>

          <div className="flex flex-col gap-4 w-full mb-4">
            <InputOtp
              isRequired
              length={4}
              size="lg"
              name="otp"
              value={value}
              onValueChange={setValue}
              errorMessage="OTP must be 4 digits"
              classNames={{
                segmentWrapper: "gap-x-3 lg:gap-x-5",
                segment: ["relative", "h-10 lg:h-16", "w-10 lg:w-16"],
              }}
            />
          </div>
          <div className="flex gap-4">
            <Button
              className="w-full bg-[#ed1d3e] text-white"
              type="submit"
              disabled={isLoading}
            >
              <p>Verify OTP</p>
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

export default Otp;
