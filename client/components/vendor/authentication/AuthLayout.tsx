"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { Tab, Tabs } from "@heroui/react";
import Image from "next/image";
import Logo from "@/components/Logo";

const AuthLayout = () => {
  const params = useSearchParams();

  const authOptions = params.get("tab");

  const [selected, setSelected] = useState<string>(authOptions || "login");

  return (
    <section className="flex justify-center min-h-screen">
      <div className="w-full bg-primary sm:flex hidden flex-col justify-center gap-10 items-end pr-40 h-screen">
        <div className="flex items-center gap-16">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-2 bg-white z-20 items-center justify-center shadow-md rounded-md lg:h-[90px] lg:w-[90px] p-2">
              <Image
                className="rounded-sm"
                src={"/campus_logo/lmu.jpg"}
                width={40}
                height={40}
                alt=" landmark logo"
              />
              <small className="font-extrabold text-gray-400 text-xs lg:block hidden">
                LMU
              </small>
            </div>
            <div className="flex flex-col gap-2 bg-white z-20 items-center justify-center shadow-md rounded-md lg:h-[90px] lg:w-[90px] p-2">
              <Image
                className="rounded-sm"
                src={"/campus_logo/cu.jpg"}
                width={50}
                height={50}
                alt=" covenant logo"
              />

              <small className="font-extrabold text-gray-400 text-xs lg:block hidden">
                CU
              </small>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-60 items-center justify-center">
              <div className="flex flex-col gap-2 bg-white z-20 items-center justify-center shadow-md rounded-md lg:h-[90px] lg:w-[90px] p-2">
                <Image
                  className="rounded-sm"
                  src={"/campus_logo/unilag.jpg"}
                  width={50}
                  height={50}
                  alt=" unilag logo"
                />

                <small className="font-extrabold text-gray-400 text-xs lg:block hidden">
                  UNILAG
                </small>
              </div>

              <div className="absolute rounded-full flex justify-center items-center  bg-red-50 backdrop-filter backdrop-blur-2xl bg-opacity-10 lg:w-[400px] lg:h-[400px] w-[300px] h-[300px] z-10">
                <div className="rounded-full  flex justify-center items-center bg-red-100 lg:w-[300px] lg:h-[300px] w-[200px] h-[200px] ">
                  <div className="rounded-full flex justify-center items-center bg-white backdrop-filter backdrop-blur-3xl bg-opacity-60 lg:w-[200px] lg:h-[200px] w-[100px] h-[100px]">
                    <Image
                      className="rounded-sm"
                      src={"/icon.png"}
                      width={150}
                      height={50}
                      alt="hallmarts logo"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 bg-white z-10 items-center justify-center shadow-md rounded-md lg:h-[90px] lg:w-[90px] p-2">
                <Image
                  className="rounded-sm"
                  src={"/campus_logo/uniport.png"}
                  width={50}
                  height={50}
                  alt=" Uniport logo"
                />

                <small className="font-extrabold text-gray-400 text-xs lg:block hidden">
                  Uniport
                </small>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-2 bg-white z-10 items-center justify-center shadow-md rounded-md lg:h-[90px] lg:w-[90px] p-2">
              <Image
                className="rounded-sm"
                src={"/campus_logo/nile.png"}
                width={50}
                height={50}
                alt=" Nile logo"
              />
              <small className="font-extrabold text-gray-400 text-xs lg:block hidden">
                Nile
              </small>
            </div>
            <div className="flex flex-col gap-2 bg-white z-10 items-center justify-center shadow-md rounded-md lg:h-[90px] lg:w-[90px] p-2">
              <Image
                className="rounded-sm"
                src={"/campus_logo/unical.jpg"}
                width={100}
                height={100}
                alt=" university of calabar logo"
              />
              <small className="font-extrabold text-gray-400 text-xs lg:block hidden">
                Unical
              </small>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end text-primary-50 font-medium">
          <div>
            <h1
              className="text-2xl mb-2 w-[400px] text-red-300 font-extrabold
        "
            >
              Grow your <span className="text-white"> campus business</span>{" "}
              online today!
            </h1>
            <p className="text-sm w-[300px] flex justify-end">
              Get your products in front of 240,000+ students across campus.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center sm:py-0 py-10 min-h-screen">
        <div className="sm:hidden flex mb-3 items-center justify-center">
          <Logo />
        </div>{" "}
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={(value) => setSelected(String(value))}
          color={"danger"}
        >
          <Tab key="signup" title="Register">
            <div className="flex justify-center my-4">
              {" "}
              <p className="text-sm  font-medium text-center w-[80%]">
                Enter campus details and connect with your csutomers.
              </p>
            </div>
            <SignUp />
          </Tab>
          <Tab key="login" title="Login">
            <div className="flex justify-center my-4">
              {" "}
              <p className="text-sm  font-medium text-center w-[80%]">
                Log In to maage your campus business from anywhere.
              </p>
            </div>
            <Login />
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default AuthLayout;
