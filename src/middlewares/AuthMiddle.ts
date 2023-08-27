import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { JWT_SECRET } from "../utilis/constants.js";

class AuthMiddle {
  private static jwtSecret: Secret = JWT_SECRET;

  /**
   * The function `authenticateToken` is used to authenticate a token in a request header and set the
   * user ID in the request body.
   * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
   * information about the incoming request such as headers, query parameters, and request body.
   * @param {Response} res - The `res` parameter is the response object. It is used to send the HTTP
   * response back to the client.
   * @param {NextFunction} next - The `next` parameter is a function that is called to pass control to
   * the next middleware function in the request-response cycle. It is used to move to the next
   * middleware function or the route handler after the current middleware function has completed its
   * task.
   * @returns If there is no token present in the request headers, the function will return a 401
   * status code. If there is a token but it fails to verify, the function will return a 403 status
   * code. Otherwise, if the token is successfully verified, the function will call the `next()`
   * function to proceed to the next middleware or route handler.
   */
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

  /**
   * The function `validateToken` takes a token as input, verifies its authenticity using a secret key,
   * and returns the decoded payload if the token is valid.
   * @param {string} token - The `token` parameter is a string that represents a JSON Web Token (JWT).
   * @returns the payload, which can be either an object or false.
   */
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

  /**
   * The function generates an access token using a payload and expiration time.
   * @param {number} payload - The payload parameter is the data that you want to include in the access
   * token. In this case, it is a number representing the user ID.
   * @param {string} expiresIn - The expiresIn parameter is a string that specifies the duration of
   * time for which the access token will be valid. It can be expressed in various formats such as
   * seconds, minutes, hours, days, etc. For example, "1h" represents an expiration time of 1 hour,
   * "30m"
   * @returns a JSON Web Token (JWT) that is generated using the payload and expiresIn parameters.
   */
  static generateAccessToken(payload: number, expiresIn: string) {
    return jwt.sign({ userId: payload }, this.jwtSecret, { expiresIn });
  }
}

export default AuthMiddle;
