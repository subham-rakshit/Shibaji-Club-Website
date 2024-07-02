import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    const authError = {
      status: 401,
      message: "Invalid User",
      extraDetails: "User Unauthorized!",
    };
    return next(authError);
  } else {
    jwt.verify(token, process.env.JWT_SIGNATURE, (err, user) => {
      if (err) {
        const jwtError = {
          status: 401,
          message: "Invalid User",
          extraDetails: "User Unauthorized!",
        };
        return next(jwtError);
      } else {
        req.user = user;
        next();
      }
    });
  }
};
