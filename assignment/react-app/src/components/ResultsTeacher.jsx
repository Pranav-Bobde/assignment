import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import teacherContext from "../context/teacher/teacherContext";

const Results = () => {
  const navigate = useNavigate();
  const context = useContext(teacherContext);

  const handleAskQuestion = () => {
    context.resetCanAsk();
    navigate("/tque");
  };

  return (
    <div className="px-8">
      <div className=" py-5">Polling Results</div>
      <hr className="b-10 h-px border-none bg-black mb-8" />
      <div className=" gap-y-4 flex flex-col">
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
      </div>
      <div>
        <button
          className="mt-8 bg-black text-white px-4 py-2"
          disabled={!context.state.canAsk}
          onClick={handleAskQuestion}
        >
          Ask another question
        </button>
      </div>
    </div>
  );
};

export default Results;
