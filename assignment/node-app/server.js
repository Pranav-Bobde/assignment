const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let sc = 0;
let ac = 0;
let question = null;
let result = null;

const rns = io.of("/result");
const sns = io.of("/students");
const tns = io.of("/teachers");

rns.on("connection", (socket) => {
  socket.on("sendAnswer", (ans) => {
    if (ans) {
      result[ans].count++;
      result[ans].percentage = ((result[ans].count / sc) * 100).toFixed();
    }
    ac++;
    if (ac === sc) {
      question = null;
      tns.emit("canAsk", true);
      ac = 0;
    }
    rns.emit("updatedRes", result);
  });

  socket.on("disconnect", () => {
    console.log("Result Disconnected: " + socket.id);
  });
});

sns.on("connection", (socket) => {
  sc++;

  socket.on("disconnect", () => {
    console.log("Student Disconnected: " + socket.id);
    sc--;
  });
});

tns.on("connection", (socket) => {
  socket.on("question", (q) => {
    let tempRes = {};
    question = q;
    sns.emit("qAlert", question);
    question.options.forEach((opt) => {
      tempRes[opt.text] = {
        count: 0,
        percentage: 0,
      };
    });
    result = tempRes;
    socket.emit("initRes", result);
  });

  socket.on("disconnect", () => {
    console.log("Teacher Disconnected: " + socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server is running at 3001...");
});
