import React, { useState } from "react";
import "./Stepper.css";
import { TiTick } from "react-icons/ti";
const Stepper = () => {
  const steps=[
    { step: "Order Confirmed", date: "7 Feb" },
    { step: "Shipped", date: "12 Feb" },
    { step: "Out For Delivery", date: "13 Feb" },
    { step: "Delivered", date: "18 Feb" },
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  return (
    <>
      <div className="container">
        {steps?.map((data, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <p style={{ color: "black", margin: ".5rem" }}>{data.step}</p>
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p key={i} style={{ color: "black", margin: ".5rem" }}>
              {data.date}
            </p>
          </div>
        ))}
      </div>
      {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default Stepper;
