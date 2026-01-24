const express = require("express");

const app = express();

// Read AWS region (fallback to 'local' for non-AWS environments)
const REGION = process.env.AWS_REGION || "local";

// Read port (cloud standard)
const PORT = process.env.PORT || 8080;

// Root route
app.get("/", (req, res) => {
  res.send(`Hello from ${REGION}!`);
});

// ---- CORS (required for browser latency tests) ---
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ---- Serve static files (index.html at root) ----

app.use(express.static(path.join(__dirname)))
// Health check (still production-friendly)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", region: REGION });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving traffic from region: ${REGION}`);
});
