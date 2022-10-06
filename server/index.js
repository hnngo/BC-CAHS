const express = require("express");
const app = express();
const cors = require("cors");
const authenticationRouter = require("./router/authentication");

require("./database");

const port = process.env.PORT || 8000;
app.use(cors());
 
app.use("/api/auth", authenticationRouter);

// app.get("/api", (req, res) => {
//   res.send("Hello from server"); 
// });

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
