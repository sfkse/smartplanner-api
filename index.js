const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const globalErrorHandler = require("./src/controllers/errorController");
const authRoutes = require("./src/routes/authRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/auth", authRoutes);
// app.use("/notes", notesRouter);

/* Error handler middleware */
app.use(globalErrorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

