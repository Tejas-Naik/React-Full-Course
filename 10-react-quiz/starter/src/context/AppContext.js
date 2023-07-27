import { createContext, useContext, useEffect, useReducer } from "react";

const SECS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'dataRecieved':
            return { ...state, questions: action.payload, status: 'ready' }

        case 'dataFailed':
            return { ...state, status: "error" }

        case 'start':
            return { ...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION }

        case 'newAnswer':
            const question = state.questions.at(state.index);

            return {
                ...state,
                answer: action.payload,
                points:
                    question.correctOption === action.payload
                        ? state.points + question.points
                        : state.points
            }

        case 'nextQuestion':
            return { ...state, index: state.index + 1, answer: null }

        case 'finish':
            return {
                ...state,
                status: "finished",
                highscore: state.points > state.highscore
                    ? state.points
                    : state.highscore
            }

        case 'restart':
            return {
                ...initialState,
                questions: state.questions,
                status: "ready"
            };

        case 'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finished' : state.status,
            }

        default:
            throw new Error("Action Unknown");
    }
}

const AppContext = createContext();

function AppProvider({ children }) {
    const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((total, question) => total + question.points, 0);

    useEffect(function () {
        fetch("http://localhost:9000/questions")
            .then(res => res.json())
            .then(data => dispatch({ type: 'dataRecieved', payload: data }))
            .catch(err => dispatch({ type: 'dataFailed' }))
    }, [dispatch]);


    return (
        <AppContext.Provider value={
            {
                questions,
                status,
                index,
                answer,
                points,
                highscore,
                secondsRemaining,
                numQuestions,
                maxPossiblePoints,
                dispatch
            }}>
            {children}
        </AppContext.Provider>
    )
}

function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) throw new Error("AppContext was used outside its provider")
    return context;
}

export { AppProvider, useAppContext };

