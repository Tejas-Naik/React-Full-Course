import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

const initialStateCustomer = {
    fullName: "",
    nationalId: "",
    createdAt: ""
}

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalId: action.payload.nationalId,
                createdAt: action.payload.createdAt,
            }

        case "customer/updateName":
            return {
                ...state,
                fullName: action.payload.fullName,
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(rootReducer);

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

// calling dispatch with action creators
store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(100));
console.log(store.getState());

store.dispatch(requestLoan(10000, "PC Setup"));
console.log(store.getState());

store.dispatch(payLoan(10000));
console.log(store.getState());

function createCustomer(fullName, nationalId) {
    return {
        type: "customer/createCustomer",
        payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString()
        }
    }
}

function updateName(fullName) {
    return {
        type: "customer/createCustomer", payload: fullName
    }
}

store.dispatch(createCustomer("Tejas Naik", "1122"));
console.log(store.getState());