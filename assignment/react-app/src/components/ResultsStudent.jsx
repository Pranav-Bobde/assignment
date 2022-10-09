import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import studentContext from "../context/student/studentContext";

const Results = () => {
  const context = useContext(studentContext);

  return (
    <>
      {!context.state.question ? (
        <div>
          <div className="px-8 py-5">Polling Results</div>
          <hr className="b-10 h-px border-none bg-black mb-8" />
          <div className="px-8 gap-y-4 flex flex-col">
            {context && context.state.result ? (
              Object.entries(context.state.result).map(([key, value]) => {
                return (
                  <div
                    className="flex items-center justify-between border border-black p-2"
                    key={key}
                  >
                    <span>{key}</span>
                    <span>{value.percentage}%</span>
                  </div>
                );
              })
            ) : (
              <div>No Result</div>
            )}
            <p className="text-white border border-black px-4 py-2 w-1/2">
              Waiting for new answers
            </p>
          </div>
          <div></div>
        </div>
      ) : (
        <Navigate to="/sans" />
      )}
    </>
  );
};

export default Results;
