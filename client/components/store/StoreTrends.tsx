"use client";
import React from "react";
import Image from "next/image";
import { Card, CardBody, CardHeader } from "@heroui/react";

const StoreTrends = () => {
  return (
    <div className="grid sm:grid-cols-4 gap-4">
      <Card className="py-4 shadow-none">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover w-full rounded-xl"
            src="/banner.png"
            width={270}
            height={100}
          />
        </CardBody>
      </Card>
      <Card className="py-4 shadow-none">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover w-full rounded-xl"
            src="/banner.png"
            width={270}
            height={100}
          />
        </CardBody>
      </Card>
      <Card className="py-4 shadow-none">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover w-full rounded-xl"
            src="/banner.png"
            width={270}
            height={100}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default StoreTrends;
