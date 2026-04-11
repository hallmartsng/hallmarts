"use client";
import React from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  addToast,
  Spinner,
} from "@heroui/react";
import PhoneInput, {
  Country,
  isValidPhoneNumber,
} from "react-phone-number-input";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import FilterCampuses from "@/components/FilterCampus";
import {
  useUserRegistrationMutation,
  useVendorRegistrationMutation,
} from "@/lib/services/authentication/auth.api";
import { RegistrationRequest } from "@/types/auth.types";

interface FormErrors {
  name?: string;
  password?: string;
  retryPassword?: string;
  terms?: string;
}

interface FormData {
  name: string;
  email: string;
  retryPassword: string;
  password: string;
  regNo: string;
  role: string;
  terms: string;
}

interface SignUpProps {
  setSelectedTabKey: (value: string) => void;
  userRole: string;
}

const SignUp = ({ userRole, setSelectedTabKey }: SignUpProps) => {
  const allowedCountries: Country[] = ["NG", "GH", "ZA"];

  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);
  const [isRetryPasswordVisible, setIsRetryPasswordVisible] =
    React.useState<boolean>(false);

  const [password, setPassword] = React.useState<string | null>("");
  const [retryPassword, setRetryPassword] = React.useState<string | null>("");
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [term, setTerm] = React.useState<boolean>(false);

  const [countryCode, setCountryCode] = React.useState<Country>("NG");
  const [phone, setPhone] = React.useState<string>("");
  const [phoneValid, setPhoneValid] = React.useState(true);

  const [errors, setErrors] = React.useState<FormErrors>({});

  const [createVendor, { isLoading }] = useVendorRegistrationMutation();
  const [createUser, { isLoading: isLoadingUser }] =
    useUserRegistrationMutation();

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

  const handlePhoneChange = (value?: string) => {
    setPhone(value ?? "");

    if (value && isValidPhoneNumber(value)) {
      return setPhoneValid(true);
    } else {
      return setPhoneValid(false);
    }
  };
  const handleCountryChange = (value?: Country) => {
    if (!value || !allowedCountries.includes(value)) return;
    setCountryCode(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submit...");

    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const payload: RegistrationRequest = {
      regNo: form.get("regNo") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      campus: form.get("campus") as string,
      countryCode: countryCode as string,
      password: form.get("password") as string,
      term: term,
    };

    try {
      const res =
        userRole === "user"
          ? await createUser(payload).unwrap()
          : await createVendor(payload).unwrap();
      addToast({
        title: "Sign Up",
        description: res.message,
        color: "success",
      });

      setSelectedTabKey("login");

      //  setStages([]);
      setErrors({});
      //  onOpenChange();
    } catch (error: any) {
      addToast({
        title: "Registration failed",
        description: error?.data?.message || "Something went wrong, try again",
        color: "danger",
      });
      console.log(error);
    }
  };

  return (
    <Form
      className="w-full sm:w-[380px] justify-center items-center space-y-4 bg-white sm:p-6 px-4 py-6 rounded-2xl shadow"
      validationErrors={errors.name ? { name: errors.name } : {}}
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

            return errors.name;
          }}
          label="Reg No. / Matric No."
          labelPlacement="outside"
          name="regNo"
          placeholder="Enter student registration or matric number"
        />

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

        <div className="flex flex-col flex-wrap w-full gap-1">
          <div className="">
            <label htmlFor="phone" className="text-sm text-black">
              Phone
            </label>
            <PhoneInput
              international
              countries={allowedCountries}
              countryCallingCodeEditable={false}
              placeholder="Enter phone number"
              defaultCountry={countryCode}
              value={phone}
              onChange={handlePhoneChange}
              onCountryChange={handleCountryChange}
              name="phone"
              className="mt-1"
            />

            {!phoneValid ? (
              <p className="text-danger text-xs mt-1 mb-3 ">
                Please enter a valid phone number
              </p>
            ) : (
              <p className="text-xs mb-3 mt-1">
                Only campuses available in your country will be displayed.
              </p>
            )}
          </div>
          <div className="w-full ">
            <FilterCampuses
              code={countryCode}
              name={"campus"}
              isRequired={true}
            />
          </div>
        </div>

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
              onClick={() => setIsRetryPasswordVisible(!isRetryPasswordVisible)}
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

        <Checkbox
          isRequired
          color="primary"
          classNames={{
            label: "text-small",
          }}
          isInvalid={!!errors.terms}
          name="terms"
          validationBehavior="aria"
          isSelected={term}
          value={term ? "true" : "false"}
          onValueChange={setTerm}
        >
          I agree to the terms and conditions
        </Checkbox>

        {errors.terms && (
          <span className="text-danger text-small">{errors.terms}</span>
        )}

        <div className="flex gap-4">
          <Button
            className="w-full flex items-center bg-[#ed1d3e] text-white"
            type="submit"
            disabled={isLoading || isLoadingUser}
          >
            <p>Sign Up</p>
            {isLoading ||
              (isLoadingUser && (
                <Spinner size="sm" variant="spinner" color="white" />
              ))}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default SignUp;
