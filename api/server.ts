import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const distPath = path.join(__dirname, "../dist");
const indexHtml = path.join(distPath, "index.html");

// ✅ Serve static assets FIRST
app.use(express.static(distPath));

// ✅ API endpoints would go here
// e.g. app.get("/api/suspects", ...)

// ✅ Fallback route (for React SPA)
app.get("*", (_req, res) => {
  res.sendFile(indexHtml);
});

// ✅ Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
