"use client";
import React from "react";
import { Form, Input, Button, addToast, Spinner, Link } from "@heroui/react";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = ({ userRole }: { userRole: string }) => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submit...");

    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const payload = {
      regNo: form.get("regNo") as string,
      password: form.get("password") as string,
      endpoint: userRole === "user" ? "user" : "vendor",
      redirect: false,
    };

    try {
      setIsLoading(true);
      const res = await signIn("credentials", payload);

      if (!res?.ok) {
        addToast({
          title: "Login failed",
          description: res?.error,
          color: "danger",
        });
      }

      if (res?.ok) {
        const session = await getSession();

        if (session?.user.role === "vendor") {
          return router.push("/vendor/dashboard");
        }
        return router.push("/store/dashboard");
      }
    } catch (error: any) {
      addToast({
        title: "Login failed",
        description: "Something went wrong, try again.",
        color: "danger",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
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
              return "Reg No. / Matric No. can not be empty ";
            }
          }}
          label="Reg No. / Matric No."
          labelPlacement="outside"
          name="regNo"
          placeholder="Enter student registration or matric number"
        />
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
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type={isPasswordVisible ? "text" : "password"}
          value={password}
          onValueChange={setPassword}
        />{" "}
        <div className="flex justify-end ">
          <Link href="/authentication/forgot-password" className="text-sm">
            Forgot password?{" "}
          </Link>
        </div>
        <div className="flex gap-4">
          <Button
            className="w-full flex items-center bg-[#ed1d3e] text-white"
            type="submit"
            disabled={isLoading}
          >
            <p>Log In</p>
            {isLoading && <Spinner size="sm" variant="spinner" color="white" />}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Login;
