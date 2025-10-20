const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Serve all static files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname)));

// Route for home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
