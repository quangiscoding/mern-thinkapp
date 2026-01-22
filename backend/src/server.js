import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

/*
 * Enable cors for frontend
 */
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
/*
 * Parse incoming JSON bodies
 */
app.use(express.json());
/*
 * Prints every method, body, and its url when a request sent
 */
app.use((req, _, next) => {
  console.log(req.method, req.body, req.url);
  next();
});
/*
 * Rate limiting
 */
app.use(rateLimiter);
/**
 * Routes
 */
app.use("/api/notes", notesRoutes);
/**
 * Global error handler (must be last)
 */
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error!",
  });
});
/*
 * Start server only after DB connects
 */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
  });
});
