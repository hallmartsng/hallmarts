"use client";
import React from "react";
import { Rating } from "react-simple-star-rating";
import { addToast, Button, Form, Input, Textarea } from "@heroui/react";
interface FormErrors {
  name?: string;
  email?: string;
  review?: string;
}

interface FormData {
  name: string;
  email: string;
  review?: string;
}
const ProductReview = () => {
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [rating, setRating] = React.useState(0);
  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      setIsLoading(true);
      // 1️⃣ Register user
      //  const res = await registerUser(data);
      const res = {
        message: "Registration successful",
      };
      console.log(res);
      addToast({
        title: "Review submitted",
        description: "Your review has been submitted",
        color: "success",
      });

      setIsLoading(false);
    } catch (err: any) {
      setErrors(err.message);
      addToast({
        title: "Error occured",
        description: err.message,
        color: "danger",
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="flex sm:flex-row flex-col items-start sm:gap-32 gap-10">
      {/* Comments  */}
      <div className="sm:w-1/2 px-4">
        <h1 className="text-4xl">4.5</h1>
        <small className="text-gray-600">Overall ratings</small>

        <div className="flex flex-col gap-10 mt-5">
          <div>
            <Rating
              initialValue={4.5}
              onClick={handleRating}
              SVGclassName="inline-block size-4"
              readonly
              allowFraction
              // className="size-20"
            />
            <h4 className="font-semibold">Paul Felix</h4>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequatur quia quis excepturi minus autem. Iste totam et alias
              voluptatem quaerat modi laudantium praesentium?
            </p>
          </div>
          <div>
            <Rating
              initialValue={4.5}
              onClick={handleRating}
              SVGclassName="inline-block size-4"
              readonly
              allowFraction
              // className="size-20"
            />
            <h4 className="font-semibold">Paul Felix</h4>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequatur quia quis excepturi minus autem. Iste totam et alias
              voluptatem quaerat modi laudantium praesentium?
            </p>
          </div>
        </div>
      </div>

      {/* New comment  */}
      <div className="sm:w-1/2 w-full flex flex-col gap-4 px-4">
        <div>
          <p className="font-semibold">Your rating</p>
          <Rating
            initialValue={0}
            onClick={handleRating}
            SVGclassName="inline-block size-6"
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
            // className="size-20"
            allowFraction
          />
        </div>
        <Form
          className="w-full space-y-4 "
          validationErrors={errors.name ? { name: errors.name } : {}}
          onReset={() => console.log("Form reset")}
          onSubmit={onSubmit}
        >
          {" "}
          <div className="flex w-full sm:flex-row flex-col gap-4 items-center justify-between">
            <Input
              isRequired
              errorMessage={({
                validationDetails,
              }: {
                validationDetails: ValidityState;
              }) => {
                if (validationDetails.valueMissing) {
                  return "Please enter name";
                }

                return;
              }}
              aria-label="full name"
              name="full_name"
              placeholder="Full name"
              type="text"
            />
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
              placeholder="Email"
              type="email"
            />
          </div>
          <Textarea placeholder="Your review" />
          <Button
            type="submit"
            onPress={() => {
              console.log("Pay now");
            }}
            className="bg-primary text-white font-semibold"
          >
            Submit review
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ProductReview;
