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

import { useAppContext } from "./context/AppContext";

function App() {

  const {
    status,
  } = useAppContext();

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen />
        )}

        {status === 'active' && (
          <>
            <Progress />
            <Question />

            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>

        )}
        {status === "finished" && (
          <>
            <FinishedScreen />
            <RestartButton />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
