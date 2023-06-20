import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [myPercentage, setMyPercentage] = useState(5);
  const [friendPercentage, setFriendPercentage] = useState(5);

  const handleClear = () => {
    setBill(0);
    setMyPercentage(5);
    setFriendPercentage(5);
  }

  return (
    <>
      <BillInput bill={bill} onSetBill={setBill} />

      <DropdownBox percentage={myPercentage} onSetPercentage={setMyPercentage} >
        <span>How did you like the service? </span>
      </DropdownBox>

      <DropdownBox percentage={friendPercentage} onSetPercentage={setFriendPercentage} >
        <span>How did your friend like the service? </span>
      </DropdownBox>

      <Result bill={bill} myPercentage={myPercentage} friendPercentage={friendPercentage} onClear={handleClear} />
    </>
  )
}

function BillInput({ bill, onSetBill }) {
  console.log(`bill: ${bill}`);
  return (
    <div>
      <label>How much was the bill? </label>
      <input type="text" value={bill || 0} onChange={(e) => onSetBill(+e.target.value)} />
    </div>
  )
}

function DropdownBox({ percentage, onSetPercentage, children }) {
  console.log(`percentage: ${percentage}`);
  return <div>
    {children}
    <select value={percentage} onChange={(e) => onSetPercentage(+e.target.value)}>
      <option value={0}>Not satisfied (0%)</option>
      <option value={5}>It was OK (5%)</option>
      <option value={10}>It was Good (10%)</option>
      <option value={20}>It was Satisfactory (20%)</option>
    </select>
  </div>
}

function Result({ bill, myPercentage, friendPercentage, onClear }) {
  const tip = ((myPercentage + friendPercentage) / 100) * bill;
  const total = bill + tip;

  return (
    <>
      <h2>You pay ${total} (${bill} + ${tip})</h2>
      {bill > 0 && <button onClick={onClear}>Reset</button>}
    </>
  );
}