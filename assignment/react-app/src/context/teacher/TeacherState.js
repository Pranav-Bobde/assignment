import TeacherContext from "../teacher/teacherContext";
import { io } from "socket.io-client";
import { useState } from "react";

const TeacherState = (props) => {
  const tsocket = io("http://localhost:3001/teachers", {
    autoConnect: false,
  });

  const rsocket = io("http://localhost:3001/result", {
    autoConnect: false,
  });
  const [state, setState] = useState({
    socket: tsocket,
    rsocket: rsocket,
    question: null,
    result: null,
    canAsk: false,
  });

  const connect = () => {
    tsocket.connect();
    rsocket.connect();

    tsocket.on("initRes", (res) => {
      setState((state) => ({ ...state, result: res }));
    });

    tsocket.on("canAsk", (res) => {
      setState((state) => ({ ...state, canAsk: res }));
    });

    rsocket.on("updatedRes", (res) => {
      setState((state) => ({
        ...state,
        result: res,
      }));
    });
  };

  const sendQuestion = (q) => {
    tsocket.emit("question", q);
  };

  const resetCanAsk = () => {
    setState((state) => ({ ...state, canAsk: false }));
  };

  return (
    <TeacherContext.Provider
      value={{ state, connect, sendQuestion, resetCanAsk }}
    >
      {props.children}
    </TeacherContext.Provider>
  );
};

export default TeacherState;
