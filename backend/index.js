// server/index.js
const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 6969;

app.use(cors());
app.use(express.json());
app.use("/api/", routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
