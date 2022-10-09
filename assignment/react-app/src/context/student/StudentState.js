import StudentContext from "./studentContext";
import { io } from "socket.io-client";
import { useState } from "react";

const StudentState = (props) => {
  const ssocket = io("http://localhost:3001/students", {
    autoConnect: false,
  });
  const rsocket = io("http://localhost:3001/result", {
    autoConnect: false,
  });

  const [state, setState] = useState({
    ssocket: ssocket,
    rsocket: rsocket,
    question: null,
    result: null,
  });

  const connect = () => {
    ssocket.connect();
    rsocket.connect();

    ssocket.on("connect", () => {
      console.log("client connected");
    });

    ssocket.on("disconnect", () => {
      console.log("client disconnect");
    });

    ssocket.on("error", (error) => {
      console.log(error);
    });

    ssocket.on("qAlert", (q) => {
      setState((state) => ({ ...state, question: q }));
    });

    rsocket.on("updatedRes", (res) => {
      setState((state) => ({
        ...state,
        result: res,
      }));
    });
  };

  const resetQuestion = () => {
    setState((state) => ({ ...state, question: null }));
  };

  return (
    <StudentContext.Provider value={{ state, connect, resetQuestion }}>
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
