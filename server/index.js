const express = require("express");
const app = express();
const cors = require("cors");
const authenticationRouter = require("./router/authentication");
const submissionRouter = require("./router/submission");
const bodyParser = require("body-parser");

require("./database");

const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authenticationRouter);
app.use("/api/form", submissionRouter);
app.get("/api", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
