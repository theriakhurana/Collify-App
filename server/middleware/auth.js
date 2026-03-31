import jwt from "jsonwebtoken";

const checkForAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token not valid" });
  }
};

const teacherOnly = (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ msg: "Access denied: Teacher Only Section" });
  }
  next();
};

export { checkForAuth, teacherOnly };
