export default function Stepper({ currentStep, numberOfSteps }) {
  let number = 1;

  return (
    <div>
      <div className="flex items-center">
        {Array.from({ length: numberOfSteps }).map((_, index) => (
          <>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                index <= currentStep ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              {number++}
            </div>
            {index < numberOfSteps - 1 && (
              <div
                className={`w-20 h-1 rounded-full ${
                  index <= currentStep - 1 ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
            )}
          </>
        ))}
      </div>
      <div className="flex justify-between -ml-[15px]">
        <p>Currency</p>
        <p>Balance</p>
        <p>Finish</p>
      </div>
    </div>
  );
}
