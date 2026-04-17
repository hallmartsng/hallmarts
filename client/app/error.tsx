"use client";

import { Button } from "@heroui/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <h2>Something went wrong!</h2>

        <Button
          onPress={() => reset()}
          className="bg-primary text-white font-semibold"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
