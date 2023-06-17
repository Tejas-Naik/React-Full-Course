import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + count);

  const formattedCurrentDate = currentDate.toLocaleDateString();
  const formattedFutureDate = futureDate.toLocaleDateString();


  return (
    <div className="App">
      <div className="flex">
        <button onClick={() => setStep((s) => s - 1)}>-</button>
        <p>Step: {step}</p>
        <button onClick={() => setStep((s) => s + 1)}>+</button>
      </div>
      <div className="flex">
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <p>Today is {formattedCurrentDate}</p>
      <p>{count} days from now is {formattedFutureDate}</p>
    </div>
  );
}

export default App;

// import { useState } from "react";

// function App() {
//   const [count, setCount] = useState(1);
//   const [step, setStep] = useState(1);

//   const currentDate = new Date();
//   const futureDate = new Date();
//   futureDate.setDate(currentDate.getDate() + step);

//   const formattedCurrentDate = currentDate.toLocaleDateString();
//   const formattedFutureDate = futureDate.toLocaleDateString();

//   const handleStepIncrement = () => {
//     setStep((s) => s + 1);
//   };

//   const handleStepDecrement = () => {
//     setStep((s) => s - 1);
//   };

//   const handleCountIncrement = () => {
//     setCount((s) => s + 1);
//   };

//   const handleCountDecrement = () => {
//     setCount((s) => s - 1);
//   };

//   return (
//     <div className="App">
//       <div className="flex">
//         <button onClick={handleStepDecrement}>-</button>
//         <p>Step: {step}</p>
//         <button onClick={handleStepIncrement}>+</button>
//       </div>
//       <div className="flex">
//         <button onClick={handleCountDecrement}>-</button>
//         <p>Count: {count}</p>
//         <button onClick={handleCountIncrement}>+</button>
//       </div>

//       <p>
//         {step} {step === 1 ? "Day" : "Days"} from today is {formattedFutureDate}
//       </p>
//       <p>Today is {formattedCurrentDate}</p>
//     </div>
//   );
// }

// export default App;
