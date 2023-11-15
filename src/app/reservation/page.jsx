import React from "react";
import Stepper from "../../components/Stepper";
import BasicDateCalendar from "@/components/Calendar";
import BasicSelect from "@/components/Select";
import Navbar from "../../commons/Navbar";
import Footer from "../../commons/Footer";

import Button from "@mui/material/Button";

const Reservation = () => {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <h3 className=" font-bold mb-6">Make a reservation</h3>

        <div className="flex flex-col lg:flex-row lg:items-start justify-center space-y-4 lg:space-y-0 lg:space-x-12">
          <div className="w-full lg:w-1/3 lg:flex-shrink-0">
            <Stepper className="mb-4 lg:mb-0" />
            <div className="lg:ml-4">
              <BasicSelect />
            </div>
            <Button
              variant="outlined"
              disabled
              className="mt-4 bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              Confirm booking
            </Button>
          </div>
          <div className="w-full lg:w-2/3 mt-4 lg:mt-0">
            <BasicDateCalendar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reservation;
