const connectToMongo = require("./db/dbConnect");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

connectToMongo();
const port = 5000;

app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/blogs", require("./routes/blogs"));
// Set up static file serving for images
app.use("/images", express.static(path.join(__dirname, "images")));


app.listen(port, () => {
  console.log(`Blog server listening on http://localhost:${port}`);
});
