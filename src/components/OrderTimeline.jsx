import React from "react";

function OrderTimeline({ status }) {

  const steps = [
    {
      name: "Placed",
      icon: "🛒",
    },
    {
      name: "Shipped",
      icon: "📦",
    },
    {
      name: "Out For Delivery",
      icon: "🚚",
    },
    {
      name: "Delivered",
      icon: "✅",
    },
  ];

  const currentStep =
    steps.findIndex(
      (step) =>
        step.name === status
    );

  return (

    <div className="timeline">

      {steps.map((step, index) => (

        <div
          key={step.name}
          className="timeline-item"
        >

          <div
            className={`step ${
              index <= currentStep
                ? "active"
                : ""
            }`}
          >

            <div className="circle">

              {step.icon}

            </div>

            <span>

              {step.name}

            </span>

          </div>

          {index !==
            steps.length - 1 && (

            <div
              className={`line ${
                index <
                currentStep
                  ? "active-line"
                  : ""
              }`}
            ></div>

          )}

        </div>

      ))}

    </div>

  );

}

export default OrderTimeline;