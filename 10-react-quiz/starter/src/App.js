import { useEffect, useReducer } from "react";

import Error from "./components/Error";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Question from "./components/Question";
import RestartButton from "./components/RestartButton";
import StartScreen from "./components/StartScreen";
import Timer from "./components/Timer";

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

function App() {

  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((total, question) => total + question.points, 0);

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
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}

        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>

        )}
        {status === "finished" && (
          <>
            <FinishedScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
            />
            <RestartButton dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
