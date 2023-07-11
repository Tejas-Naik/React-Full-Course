import { useEffect, useReducer } from "react";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return { ...state, questions: action.payload, status: 'ready' }

    case 'dataFailed':
      return { ...state, status: "error" }

    default:
      throw new Error("Action Unknown")
  }
}

function App() {

  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataRecieved', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }))
  }, []);


  return (
    <div className="app">
      <Header />

      <Main>
        <p>{status === 'loading' && <Loader />}</p>
        <p>{status === 'error' && <Error />}</p>
        <p>{status === 'ready' && <StartScreen numQuestions={numQuestions} />}</p>
      </Main>
    </div>
  );
}

export default App;
