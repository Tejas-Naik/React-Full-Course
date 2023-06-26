import { useState } from "react"

export default function App() {
  const [step, setStep] = useState(1)
  return (
    <div className="app">
      {step === 1 ? <PersonalInfoStep onStepChange={setStep} /> : ""}
      {step === 2 ? <PlansStep /> : ""}
    </div>)
}

function PersonalInfoStep({ onStepChange }) {
  return <form className="personal-info">
    <label>Name</label>
    <input type="text" />

    <label>Email</label>
    <input type="email" />

    <label>Phone</label>
    <input type="tel" />

    <button className="button" onClick={() => onStepChange(step => step + 1)}>Next</button>
  </form>
}
function PlansStep({ onStepChange }) {
  return <form className="personal-info">
    <select>
      <option>$49.99</option>
      <option>$29.99</option>
      <option>$19.99</option>
    </select>

    <button className="button" onClick={() => onStepChange(step => step - 1)}>Previous</button>
    <button className="button" onClick={() => onStepChange(step => step + 1)}>Next</button>
  </form>
}

