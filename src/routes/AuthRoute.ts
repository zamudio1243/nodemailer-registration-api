import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import AuthMiddle from "../middlewares/AuthMiddle.js";
import CryptoServ from "../services/CryptoServ.js";
import { EmailServ } from "../services/EmailServ.js";
import { EmailType } from "../types/EmailTypes.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/login",
  AuthMiddle.authenticateToken,
  (req: Request, res: Response) => {}
);

router.post("/signup", async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  const isEmailExist = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  if (isEmailExist) {
    return res.status(400).send("Email already exist");
  }

  const user = await prisma.users.create({
    data: {
      email,
      password: CryptoServ.encryptPass(password),
      username,
    },
  });

  const mail = new EmailServ();
  await mail.sendMail<EmailType.CONFIRM>(email, EmailType.CONFIRM, {
    token: AuthMiddle.generateAccessToken(user.email),
    fullHost: `${req.protocol}://${req.headers.host}`,
  });
  return res.send("Success");
});

router.get("/reset-password/:token", (req: Request, res: Response) => {
  
});

export default router;
