import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import studentContext from "../../context/student/studentContext";

const StudentAnswer = () => {
  const navigate = useNavigate();
  const context = useContext(studentContext);
  const question = context.state.question;
  const formRef = useRef();
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (!question) {
      navigate("/results");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => {
        return timer - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      context.resetQuestion();
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    let ans = "";
    if (formRef.current) {
      for (let i = 0; i < question.options.length; i++) {
        if (formRef.current[i].checked) {
          ans = question.options[i].text;
          break;
        }
      }
    }
    context.state.rsocket.emit("sendAnswer", ans);
    navigate("/results");
  };

  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <div>Select correct option and submit</div>
        <div>Timer: {timer} remaining</div>
      </div>
      {question && question.text && (
        <div>
          <div className="py-2 px-5">Q. {question.text}</div>
          <form className="w-3/12 px-5" ref={formRef}>
            {question.options.map((opt, i) => (
              <div className="flex text-center p-2" key={i}>
                <input
                  type="radio"
                  name="option"
                  id={i.toString()}
                  className="mr-4"
                />
                <label htmlFor={i.toString()}>{opt.text}</label>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="border border-black bg-black text-white px-2 py-1 mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentAnswer;
