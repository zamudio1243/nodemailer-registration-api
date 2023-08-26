import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
dotenv.config();

class Auth {
  private static jwtSecret: Secret = process.env.JWT_SECRET as Secret;

  static authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader: string | undefined = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, this.jwtSecret, (err, user: any) => {
      if (err) return res.sendStatus(403);
      //req.userId = user;
      next();
    });
  }

  static generateAccessToken(user: any) {
    return jwt.sign({ userId: user.id }, this.jwtSecret, { expiresIn: "1h" });
  }
}

export default Auth;
