const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload }

        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }

        case "account/requestLoan":
            if (state.loan > 0) return state;
            // LATER
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }

        case "account/payLoan":
            if (state.balance < state.loan) return state;
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan,
            }

        default:
            return state;
    }
}

// Creating action creators
function deposit(amount) {
    return { type: "account/deposit", payload: amount }
};

function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }
};

function requestLoan(amount, purpose) {
    return {
        type: "account/requestLoan",
        payload: { amount, purpose },
    }
};

function payLoan() {
    return { type: "account/payLoan" };
};

export { deposit, payLoan, requestLoan, withdraw };
