import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
// import Results from "./components/Results";
import ResultsStudent from "./components/ResultsStudent";
import ResultsTeacher from "./components/ResultsTeacher";
import StudentAnswer from "./components/Student/StudentAnswer";
import StudentName from "./components/Student/StudentName";
import TeacherQuestion from "./components/Teacher/TeacherQuestion";
import Waiting from "./components/Waiting";
import StudentState from "./context/student/StudentState";
import TeacherState from "./context/teacher/TeacherState";

export default function App() {
  return (
    <StudentState>
      <TeacherState>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sname" element={<StudentName />} />
          <Route path="/sans" element={<StudentAnswer />} />
          <Route path="/tque" element={<TeacherQuestion />} />
          <Route path="/results" element={<ResultsStudent />} />
          <Route path="/resultt" element={<ResultsTeacher />} />
          <Route path="/wait" element={<Waiting />} />
        </Routes>
      </TeacherState>
    </StudentState>
    // <div className="h-screen">
    //   {/* <Home /> */}
    //   {/* <StudentName /> */}
    //   {/* <Waiting /> */}
    //   {/* <StudentAnswer /> */}
    //   {/* <TeacherQuestion /> */}
    //   <Results />
    // </div>
  );
}
