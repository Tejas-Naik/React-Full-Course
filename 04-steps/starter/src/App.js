import { Children, useState } from "react";
// import "./index.css";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];


function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  // const [test, setTest] = useState({ name: "Tejas" });

  const handlePrevious = () => {
    if (step > 1) setStep((s) => s - 1);
  };
  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);

    // BAD PRACTICE (NEVER DO THIS)

    // test.name = "Jonas";
    // USE THIS INSTEAD
    // setTest({ name: "Jonas" });
  }

  const handleClose = () => {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <button className="close" onClick={handleClose}>&times;</button>

      {isOpen &&
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              bgColor='#7950f2'
              textColor='#fff'
              onClick={handlePrevious}
            >
              <span>👈</span>
              <span>Previous</span>
            </Button>

            <Button
              bgColor='#7950f2'
              textColor='#fff'
              onClick={handleNext}
              emoji=""
            >
              <span>Next</span>
              <span>👉</span>
            </Button>

          </div>
        </div>
      }
    </>
  )
}

export default App;

function StepMessage({ step, children }) {
  return <div className="message">
    <h3>Step {step}</h3>
    {children}
  </div>
}


function Button({ textColor, onClick, bgColor, children }) {
  return <button
    style={{ backgroundColor: bgColor, color: textColor }}
    onClick={onClick}>
    {children}
  </button>
}