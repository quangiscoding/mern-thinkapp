import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit(req.ip);
    if (!success) {
      res.status(429).json({ message: "Too many requests, try again later!" });
      return;
    }
    next();
  } catch (error) {
    console.error("RateLimiting error:", error);
    next(error);
  }
};

export default rateLimiter;
