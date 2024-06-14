import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json("Invalid Token");
    }

    req.user = user;

    next();
  });
};
