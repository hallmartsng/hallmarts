"use client";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import React from "react";

interface StoreProductListsProps {
  gridColsDesktop?: string;
}
export default function StoreProductLists({
  gridColsDesktop = "sm:grid-cols-8",
}: StoreProductListsProps) {
  const list = [
    {
      title: "Orange",
      img: "/sample_image.jfif",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/max-payne.jpg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/sample_image.jfif",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/sample_image.jfif",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/sample_image.jfif",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/max-payne.jpg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/sample_image.jfif",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/sample_image.jfif",
      price: "$12.20",
    },
  ];

  return (
    <div className={`gap-2 grid grid-cols-2 ${gridColsDesktop}`}>
      {list.map((item, index) => (
        /* eslint-disable no-console */
        <Card
          key={index}
          isPressable
          shadow="sm"
          className="rounded-md"
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="w-full object-cover h-[140px]"
              radius="md"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col items-end gap-2">
            <div className="flex items-center justify-between w-full">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </div>
            {/* <button
              onClick={() => {
                return console.log("add to cart");
              }}
              className="bg-primary text-xs font-semibold rounded-md px-4 py-2 text-white"
            >
              Add to cart
            </button> */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
