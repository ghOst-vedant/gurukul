import { submitPricing } from "@/actions/actions";
import { Pricing } from "@/app/addnewcourse/page";
import React, { Dispatch, SetStateAction } from "react";

type CourseCreatePricingProps = {
  pricing: Pricing;
  setPricing: Dispatch<SetStateAction<Pricing>>;
};

const CourseCreatePricing: React.FC<CourseCreatePricingProps> = ({
  pricing,
  setPricing,
}) => {
  const setCourseFreeStatus = (status: boolean) => {
    setPricing((prevDetails) => ({ ...prevDetails, isCourseFree: status }));
  };

  const handleChangePricing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPricing((prevDetails) => ({
      ...prevDetails,
      price: parseInt(e.target.value),
    }));
  };

  const savePricingDetails = async() => {
   await submitPricing(pricing)
   
  };

  return (
    <div className="w-full shadow flex flex-col h-fit rounded-lg">
      <h2 className="text-2xl font-medium p-8 border-b-2">Pricing</h2>
      <div className="p-8 flex flex-col gap-8">
        <p>
          Please select whether the course is free or paid. If it is paid, put
          the pricing in the textbox
        </p>
        <div className="flex flex-col gap-6">
          <span className="flex gap-4">
            <button
              className={`text-black hover:text-white hover:bg-blue border-2 border-blue rounded-full px-5 py-2 sm:px-4 sm:py-2 ${
                pricing.isCourseFree ? "bg-blue text-white" : "bg-white"
              }`}
              onClick={() => setCourseFreeStatus(true)}
            >
              Course is Free
            </button>
            <button
              className={`text-black hover:text-white hover:bg-blue border-2 border-blue rounded-full px-5 py-2 sm:px-4 sm:py-2 ${
                !pricing.isCourseFree ? "bg-blue text-white" : "bg-white"
              }`}
              onClick={() => setCourseFreeStatus(false)}
            >
              Course is Paid
            </button>
          </span>
          <span
            className={`${
              pricing.isCourseFree ? "hidden" : "flex"
            } flex-col w-fit gap-2`}
          >
            <label htmlFor="price" className="font-medium text-lg">
              Enter price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={`${pricing.price || 0}`}
              onChange={handleChangePricing}
              placeholder="Eg:499"
              className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
            />
          </span>
        </div>
        <button
          className="text-black hover:text-white hover:bg-blue border-2 border-blue rounded-full px-5 py-2 sm:px-4 sm:py-2 mx-auto mt-4"
          onClick={savePricingDetails}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CourseCreatePricing;
