"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import { useLazyGetUserShippingAddressQuery } from "@/lib/services/shipping/shipping.api";
import { deleteFromCart } from "@/lib/slices/cartSlice";
import nairaSymbol from "@/utils/symbols";
import {
  addToast,
  Button,
  Form,
  Image,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { skip } from "node:test";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
}
const StoreCheckout = () => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();
  const [useCampusAddress, setUseCampusAddress] = React.useState(false);

  const [errors, setErrors] = React.useState<FormErrors>({});
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [fetchShipping, { data, isLoading }] =
    useLazyGetUserShippingAddressQuery();

  const states = [
    {
      key: "abia",
      label: "Abia",
    },
    {
      key: "lagos",
      label: "Lagos",
    },
    {
      key: "abuja",
      label: "Abuja",
    },
  ];
  const countries = [
    {
      key: "nigeria",
      label: "Nigeria",
    },
    {
      key: "ghana",
      label: "Ghana",
    },
  ];

  const [showLoginMsg, setShowLoginMsg] = React.useState<boolean>(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      return setShowLoginMsg(true);
    }
    const data = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as unknown as FormData;

    // Custom validation checks
    const newErrors: FormErrors = {};

    // Username validation
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    // Clear errors and submit
    setErrors({});

    try {
      // 1️⃣ Register user
      //  const res = await registerUser(data);
      const res = {
        message: "Registration successful",
      };
      console.log(res);
      addToast({
        title: "Order completed",
        description: "Your order has been completed",
        color: "success",
      });
    } catch (err: any) {
      setErrors(err.message);
      addToast({
        title: "Error occured",
        description: err.message,
        color: "danger",
      });
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (useCampusAddress === true && session?.user.id) {
  //       const res = await fetchShipping(session?.user.id);
  //       console.log("res: ", res);
  //     }
  //     return;
  //   };
  //   fetchData();
  //   console.log("session: ", session);
  // }, [useCampusAddress, fetchShipping]);
  return (
    <section className="w-full flex sm:flex-row flex-col sm:justify-between items-start gap-4">
      <div className="flex sm:hidden flex-col gap-3">
        <span className="text-xs">
          Toggle to use your default campus address.
        </span>
        <Switch
          isSelected={useCampusAddress}
          className="w-full"
          size="sm"
          onValueChange={setUseCampusAddress}
        >
          My campus
        </Switch>
      </div>
      <Form
        className="w-full sm:w-[880px] justify-center items-center space-y-4 "
        validationErrors={errors.name ? { name: errors.name } : {}}
        onReset={() => console.log("Form reset")}
        onSubmit={onSubmit}
        id="checkout-form"
      >
        {/* Personal Data  */}
        <div className="w-full bg-white rounded-lg shadow ">
          <div className="w-full flex justify-between items-center  border-b-1 border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center p-2 bg-gray-300 font-semibold rounded-full">
                1
              </div>{" "}
              <h1 className="text-xl font-bold">Personal Details</h1>
            </div>
            <div className="sm:flex hidden items-center gap-3">
              <span className="text-xs">
                Toggle to use your default campus address.
              </span>
              <Switch
                isSelected={useCampusAddress}
                className="w-full"
                size="sm"
                onValueChange={setUseCampusAddress}
              >
                My campus
              </Switch>
            </div>
          </div>

          {/* personal details form  */}
          {useCampusAddress ? (
            <ul className="flex text-sm flex-col w-full gap-4 p-4">
              <li>
                <span className="font-semibold">Full Name:</span>{" "}
                <span>{session?.user.name}</span>
              </li>
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <span>{session?.user.email}</span>
              </li>
              <li>
                <span className="font-semibold">Phone:</span>{" "}
                <span>{session?.user.phone}</span>
              </li>
            </ul>
          ) : (
            <div className="flex flex-col w-full gap-4 p-4">
              <Input
                isRequired
                errorMessage={({
                  validationDetails,
                }: {
                  validationDetails: ValidityState;
                }) => {
                  if (validationDetails.valueMissing) {
                    return "Please enter full name";
                  }

                  return;
                }}
                aria-label="Full name"
                name="full_name"
                placeholder="Enter your full name"
                type="text"
              />
              <div className="flex sm:flex-row flex-col gap-4 items-center justify-between">
                <Input
                  isRequired
                  errorMessage={({
                    validationDetails,
                  }: {
                    validationDetails: ValidityState;
                  }) => {
                    if (validationDetails.valueMissing) {
                      return "Please enter email";
                    }

                    return;
                  }}
                  aria-label="Email"
                  name="email"
                  placeholder="Your email"
                  type="email"
                />
                <Input
                  isRequired
                  errorMessage={({
                    validationDetails,
                  }: {
                    validationDetails: ValidityState;
                  }) => {
                    if (validationDetails.valueMissing) {
                      return "Please enter phone";
                    }

                    return;
                  }}
                  aria-label="Phone"
                  name="phone"
                  placeholder="Phone"
                  type="text"
                />
              </div>
            </div>
          )}
        </div>

        {/* Delivery Data  */}
        <div className="w-full bg-white rounded-lg shadow ">
          <div className="w-full flex sm:flex-row flex-col sm:items-center gap-4 border-b-1 border-gray-200 p-4">
            <div className="w-full flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center p-2 bg-gray-300 font-semibold rounded-full">
                2
              </div>{" "}
              <h1 className="text-xl font-bold">Delivery Details</h1>
            </div>
          </div>

          {/* Delivery details form  */}
          {useCampusAddress ? (
            <ul className="flex text-sm flex-col w-full gap-4 p-4">
              <li>
                <span className="font-semibold">Campus:</span>{" "}
                <span>{session?.user.campus}</span>
              </li>
              <li>
                <span className="font-semibold">Country:</span>{" "}
                <span>{session?.user.country}</span>
              </li>
            </ul>
          ) : (
            <div className="flex flex-col gap-4 p-4">
              <div className="flex sm:flex-row flex-col gap-4 items-center justify-between">
                <Input
                  isRequired
                  errorMessage={({
                    validationDetails,
                  }: {
                    validationDetails: ValidityState;
                  }) => {
                    if (validationDetails.valueMissing) {
                      return "Please enter address";
                    }

                    return;
                  }}
                  aria-label="Address"
                  name="address"
                  placeholder="Address"
                  type="text"
                />
                <Input
                  isRequired
                  className="sm:w-1/2"
                  errorMessage={({
                    validationDetails,
                  }: {
                    validationDetails: ValidityState;
                  }) => {
                    if (validationDetails.valueMissing) {
                      return "Please enter city";
                    }

                    return;
                  }}
                  aria-label="city"
                  name="city"
                  placeholder="City"
                  type="text"
                />
              </div>
              <div className="flex sm:flex-row flex-col gap-4 items-center justify-between">
                <Select
                  isRequired
                  className="w-full"
                  aria-label="Select a state"
                  placeholder="State"
                  name="state"
                >
                  {states.map((state) => (
                    <SelectItem key={state.key}>{state.label}</SelectItem>
                  ))}
                </Select>
                <Select
                  className="w-full"
                  isRequired
                  aria-label="Select a country"
                  placeholder="Country"
                  name="country"
                >
                  {countries.map((country) => (
                    <SelectItem key={country.key}>{country.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          )}
        </div>
      </Form>

      {/* Checkout details  */}
      <div className=" bg-white w-full sm:w-[400px] rounded-lg shadow p-4 flex flex-col gap-4">
        {/* Items  */}
        {cart &&
          cart?.items?.map((item) => {
            return (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-10 border-b-1 border-gray-200 pb-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[80px]">
                    <Image
                      alt={`check out product`}
                      className="w-full object-cover h-[70px]"
                      radius="lg"
                      shadow="sm"
                      src={
                        item.imgUrl[0].url ?? "/image-upload-image-fallback.png"
                      }
                      width="100%"
                    />
                  </div>
                  <div className="text-sm font-semibold">
                    <p className="w-[100px] truncate">{item.name}</p>
                    <button
                      onClick={() => {
                        dispatch(deleteFromCart(item.productId));
                      }}
                      className="flex text-primary text-sm font-medium items-center gap-1"
                    >
                      <IoClose />
                      <span> Remove</span>{" "}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="h-10 w-10 border-1 border-gray-200 flex items-center justify-center p-2 rounded-lg">
                    {item?.quantity}
                  </div>
                  <p className="font-semibold">
                    {`${nairaSymbol()}${item?.price?.toLocaleString()}` || 0}
                  </p>
                </div>
              </div>
            );
          })}

        {/* Checkout summary  */}
        <div className="flex text-sm font-semibold flex-col gap-2 w-full">
          <span className="flex items-center justify-between w-full">
            <span>Sub total:</span>
            <span>
              {(cart?.subtotal &&
                `${nairaSymbol()}${cart?.subtotal?.toLocaleString()}`) ||
                0}
            </span>
          </span>
          <span className="flex items-center justify-between w-full">
            <span>Discount</span>
            <span>
              <span>{`${nairaSymbol()}0.00`}</span>
            </span>
          </span>
          <span className="flex items-center justify-between w-full">
            <span>Total:</span>
            <span>
              {(cart?.subtotal &&
                `${nairaSymbol()}${cart?.subtotal?.toLocaleString()}`) ||
                0}
            </span>
          </span>

          <Button
            // onPress={(e) => {
            //   onSubmit(e as React.FormEvent<HTMLFormElement>);
            // }}
            type="submit"
            form="checkout-form"
            disabled={showLoginMsg}
            className="bg-primary text-white font-semibold"
          >
            Pay now
          </Button>
          {showLoginMsg && (
            <small className=" font-medium text-sm ">
              To proceed with payment,
              <Link href={"/store/auth"} className="text-primary">
                {" "}
                Log In
              </Link>{" "}
            </small>
          )}
        </div>
      </div>
    </section>
  );
};

export default StoreCheckout;
