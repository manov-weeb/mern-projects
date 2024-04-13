import jwt from "jsonwebtoken";

// Middleware function to protect routes
export const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }

    req.user = decoded.user; // Attach decoded user information to the request object
    next(); // Proceed to the protected route
  });
};
