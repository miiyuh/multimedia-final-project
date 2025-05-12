import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const distPath = path.join(__dirname, "../dist");
const indexPath = path.join(distPath, "index.html");

// ✅ Serve static files FIRST
app.use(express.static(distPath));

// ✅ (Optional) Your /api routes here, if any

// ✅ Fallback for SPA (must come LAST)
app.get("*", (_req, res) => {
  res.sendFile(indexPath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
