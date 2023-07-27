// import { useReducer, useState } from "react";

// function reducer(state, action) {
//     if (action.type === 'increment') {
//         return state + 1;
//     }

//     if (action.type === 'decrement') {
//         return state - 1;
//     }



//     console.log(state, action);
//     return state;
// }

// function DateCounter() {
//     // const [count, setCount] = useState(0);

//     const [count, dispatch] = useReducer(reducer, 0);

//     const [step, setStep] = useState(1);

//     // This mutates the date object.
//     const date = new Date("june 21 2027");
//     date.setDate(date.getDate() + count);

//     const dec = function () {
//         dispatch({ type: 'decrement' })
//         // setCount((count) => count - 1);
//         // setCount((count) => count - step);
//     };

//     const inc = function () {
//         dispatch({ type: 'increment' })
//         // setCount((count) => count + 1);
//         // setCount((count) => count + step);
//         dispatch(1);
//     };

//     const defineCount = function (e) {
//         // setCount(Number(e.target.value));
//     };

//     const defineStep = function (e) {
//         setStep(Number(e.target.value));
//     };

//     const reset = function () {
//         // setCount(0);
//         setStep(1);
//     };

//     return (
//         <div className="counter">
//             <div>
//                 <input
//                     type="range"
//                     min="0"
//                     max="10"
//                     value={step}
//                     onChange={defineStep}
//                 />
//                 <span>{step}</span>
//             </div>

//             <div>
//                 <button onClick={dec}>-</button>
//                 <input value={count} onChange={defineCount} />
//                 <button onClick={inc}>+</button>
//             </div>

//             <p>{date.toDateString()}</p>

//             <div>
//                 <button onClick={reset}>Reset</button>
//             </div>
//         </div>
//     );
// }
// export default DateCounter;

import { useReducer, useState } from "react";

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'incrementByStep':
            return state + action.step;
        case 'reset':
            return 0;
        case 'setStep':
            return action.step;
        default:
            console.log(state, action);
            return state;
    }
}

function DateCounter() {
    const [count, dispatch] = useReducer(reducer, 0);

    const [step, setStep] = useState(1);

    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({ type: 'incrementByStep', step: -step });
    };

    const inc = function () {
        dispatch({ type: 'incrementByStep', step: step });
    };

    const defineStep = function (e) {
        const newStep = Number(e.target.value);
        setStep(newStep);
        dispatch({ type: 'setStep', step: newStep });
    };

    const reset = function () {
        dispatch({ type: 'reset' });
        setStep(1);
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} readOnly />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default DateCounter;
