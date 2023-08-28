import { body, validationResult } from "express-validator";
import { NextFunction, Response, Request } from "express";

class ValidationMiddle {
  /**
   * The function `registerValidationRules` returns an array of validation rules for the fields
   * `username`, `email`, and `password` in a registration form.
   * @returns an array of validation rules for registering a user.
   */
  static signupValidationRules() {
    return [
      body("username")
        .notEmpty()
        .withMessage("Username field cannot be empty")
        .trim(),

      body("email")
        .notEmpty()
        .withMessage("Email field cannot be empty")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

      body("password")
        .notEmpty()
        .withMessage("Password field cannot be empty")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .trim(),
    ];
  }

  /**
   * The loginValidationRules function returns an array of validation rules for email and password
   * fields in a login form.
   * @returns An array of validation rules for the login form.
   */
  static loginValidationRules() {
    return [
      body("email")
        .notEmpty()
        .withMessage("Email field cannot be empty")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

      body("password")
        .notEmpty()
        .withMessage("Password field cannot be empty")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .trim(),
    ];
  }

  /**
   * The function validates the request and returns any errors as a JSON response if there are any.
   * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
   * information about the incoming request such as headers, query parameters, and request body.
   * @param {Response} res - The `res` parameter is the response object that is used to send the
   * response back to the client. It contains methods and properties that allow you to set the status
   * code, headers, and send the response body.
   * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to
   * the next middleware function in the request-response cycle. It is typically used to move on to the
   * next function in the middleware stack.
   * @returns If there are validation errors, a response with status code 400 and an array of errors
   * will be returned. Otherwise, the next middleware function will be called.
   */
  static validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}

export default ValidationMiddle;
