import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import teacherContext from "../../context/teacher/teacherContext";

const TeacherQuestion = () => {
  //context
  const context = useContext(teacherContext);
  useEffect(() => {
    context.connect();
  }, [context]);

  //question/form
  const fRef = useRef();
  const question = {};
  const [options, setOptions] = useState([{ inputId: 1, radioId: 1 }]);
  let i = 2;
  const addOption = () => {
    let option = {
      inputId: i,
      radioId: i,
    };
    i++;
    setOptions([...options, option]);
  };

  //OnSubmit
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    question.text = fRef.current[0].value;
    question.options = [];
    for (let i = 1; i <= 2 * options.length; i += 2) {
      let input = fRef.current[i];
      let radio = fRef.current[i + 1];
      question.options.push({
        text: input.value,
        isCorrect: radio.checked,
      });
    }
    context.sendQuestion(question);
    navigate("/resultt");
  };

  return (
    <div className="p-5">
      <form ref={fRef}>
        <label>Enter question and options</label>
        <br />
        <textarea
          name=""
          rows="2"
          className="border border-black w-full mb-2"
          placeholder="Enter..."
        />
        <div className="w-1/2">
          <div className="flex items-center justify-between">
            <span>Options</span>
            <span>Is Correct?</span>
          </div>
          {options.map((opt, ind) => (
            <div className="flex text-center justify-between py-2" key={ind}>
              <input
                type="text"
                className="border border-black"
                id={opt.inputId}
              />
              <input type="radio" name="option" id={opt.radioId.toString()} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            className="mt-8 bg-black text-white px-4 py-2"
            onClick={addOption}
          >
            Add another option
          </button>
          <button
            type="submit"
            className="mt-8 bg-black text-white px-4 py-2"
            onClick={handleSubmit}
          >
            Ask Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherQuestion;
