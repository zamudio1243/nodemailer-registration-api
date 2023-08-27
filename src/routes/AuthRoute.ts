import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import AuthMiddle from "../middlewares/AuthMiddle.js";
import CryptoServ from "../services/CryptoServ.js";
import { EmailServ } from "../services/EmailServ.js";
import { EmailType } from "../types/EmailTypes.js";

const router = express.Router();
const prisma = new PrismaClient();

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
    token: AuthMiddle.generateAccessToken(user.id, "24h"),
    fullHost: `${req.protocol}://${req.headers.host}`,
  });

  const token = AuthMiddle.generateAccessToken(email, "24h");
  return res.send({ token });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  if (!CryptoServ.isValidPass(password, user.password))
    return res.status(400).send({ error: "password is invalid" });
  const token = AuthMiddle.generateAccessToken(user.id, "24h");
  return res.status(200).send({ token });
});

router.get("/confirm-email/:token", async (req: Request, res: Response) => {
  const { token } = req.params;
  const payload = AuthMiddle.validateToken(token);
  if (!payload) return res.status(400).send("Invalid token");
  await prisma.users.update({
    where: {
      id: payload.userId,
    },
    data: {
      verified: true,
    },
  });
  return res.send("Success");
});

export default router;
