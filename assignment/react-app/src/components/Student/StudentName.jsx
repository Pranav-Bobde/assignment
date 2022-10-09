import React, { useCallback, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import studentContext from "../../context/student/studentContext";

const StudentName = () => {
  const navigate = useNavigate();
  const context = useContext(studentContext);
  const [isReg, SetIsReg] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const funct = useCallback(() => {
    sessionStorage.setItem("ref", true);
    // eslint-disable-next-line no-restricted-globals
    removeEventListener("beforeunload", funct);
  });
  useEffect(() => {
    context.connect();

    // eslint-disable-next-line no-restricted-globals
    addEventListener("beforeunload", funct);
    if (localStorage.getItem("ref")) {
      SetIsReg(isReg, true);
    }
  }, [context, isReg, funct]);
  return (
    <>
      {isReg ? (
        <Navigate to="/wait" />
      ) : (
        <div className="flex items-center justify-center h-screen flex-col">
          <input
            type="text"
            placeholder="Enter your name..."
            className="border border-black bg-gray-300 w-6/12 p-2"
          />
          <button
            className="mt-10 py-2 px-2 bg-black text-white rounded-md border"
            onClick={() => {
              navigate("/wait");
            }}
          >
            Continue...
          </button>
        </div>
      )}
    </>
  );
};

export default StudentName;
