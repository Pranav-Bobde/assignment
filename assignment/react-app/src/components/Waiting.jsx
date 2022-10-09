import { useContext } from "react";
import { Navigate } from "react-router-dom";
import studentContext from "../context/student/studentContext";

const Waiting = () => {
  const { state } = useContext(studentContext);
  return (
    <>
      {state.question ? (
        <Navigate to="/sans" />
      ) : (
        <div className="flex items-center justify-center h-screen flex-col">
          Waiting for teacher to ask question...
        </div>
      )}
    </>
  );
};

export default Waiting;
