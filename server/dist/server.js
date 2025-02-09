import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
// Load environment variables
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Import the routes
import routes from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 3001;
console.log(`App is running on port: ${PORT}`);
// ✅ Serve static files from the client build folder (fixes missing frontend)
app.use(express.static(path.resolve(__dirname, "../client/dist")));
// ✅ Middleware for JSON and form data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ✅ API Routes
app.use(routes);
// ✅ Fix: Handle React Frontend Routing (SPA Fallback)
// This ensures that React handles routes properly (e.g., "/dashboard", "/play")
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});
// ✅ Start the server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
