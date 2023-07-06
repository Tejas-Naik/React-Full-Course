import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import './textExpander.css';
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
    const [amount, setAmount] = useState("");
    const [amountCurrency, setAmountCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        function fetchCurrency() {
            setLoading(true);
            fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${amountCurrency}&to=${toCurrency}`)
                .then(res => res.json())
                .then(data => {
                    setOutput(data.rates?.[toCurrency].toLocaleString())
                    console.log(data);
                    setLoading(false);
                })
        }
        fetchCurrency();

    }, [amount, amountCurrency, toCurrency])

    return (
        <div className='App'>
            <input type="text" value={amount} onChange={(e) => setAmount(+e.target.value)} />
            <select value={amountCurrency} onChange={(e) => setAmountCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>{loading ? "Loading..." : (output ? `${output} ${toCurrency}` : "")} </p>
        </div>
    );
}
