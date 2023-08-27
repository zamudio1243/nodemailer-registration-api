import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { JWT_SECRET } from "../utilis/constants.js";

class AuthMiddle {
  private static jwtSecret: Secret = JWT_SECRET;

  static authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader: string | undefined = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, AuthMiddle.jwtSecret, (err, payload: any) => {
      if (err) return res.sendStatus(403);
      req.body.userId = payload.userId;
      next();
    });
  }

  static validateToken(token: string) {
    let payload: any | false = false;
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      payload = decoded;
    } catch (err) {
      console.log(err);
    }
    return payload;
  }

  static generateAccessToken(payload: number, expiresIn: string) {
    return jwt.sign({ userId: payload }, this.jwtSecret, { expiresIn });
  }
}

export default AuthMiddle;
