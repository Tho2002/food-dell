import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not" });
  }
  try {
    const token_deco = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_deco.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
