import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
const NODE_ENV = process.env.NODE_ENV;

const frontendDist =
  NODE_ENV === "production"
    ? path.join(__dirname, "../frontend", "dist")
    : null;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

if (NODE_ENV === "production") {
  console.log("Serving frontend from:", frontendDist);
  app.use(express.static(frontendDist));
}
// app.use((req, _, next) => {
//   console.log(req.method, req.body, req.url);
//   next();
// });
app.use("/api", rateLimiter);
app.use("/api/notes", notesRoutes);
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error!",
  });
});

if (NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}
/**
 * Start server only after DB connects
 */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
  });
});
