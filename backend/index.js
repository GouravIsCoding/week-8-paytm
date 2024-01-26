require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routes/index");

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => console.log(`started listening on port ${PORT}`));
