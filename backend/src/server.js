import express from "express";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// this parses JSON
app.use(express.json());
// I define this middleware: prints every method, body, and its url when a request sent
app.use((req, _, next) => {
  console.log(req.method, req.body, req.url);
  next();
});
// rateLimit
app.use(rateLimiter);
// routes
app.use("/api/notes", notesRoutes);
// error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({
    message: err.message || "Internal server error!",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
  });
});
