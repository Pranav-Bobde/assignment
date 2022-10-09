import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-center text-4xl flex justify-center">
        Select what type of user you are?
      </h1>
      <div className="p-3">
        <button
          className="mr-20 py-2 px-2 bg-green-300 rounded-md border"
          onClick={() => {
            navigate("/sname");
          }}
        >
          Student
        </button>
        <button
          className="py-2 px-2 bg-green-300 rounded-md borde"
          onClick={() => {
            navigate("/tque");
          }}
        >
          Teacher
        </button>
      </div>
    </div>
  );
};

export default Home;
