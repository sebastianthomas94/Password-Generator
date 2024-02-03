import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.password;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userEmail = decoded.userId;
      next();
    } else {
      res.status(401).json({ error: "Not authorized, no token" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

export { protect };
