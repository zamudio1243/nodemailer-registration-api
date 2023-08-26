import express, { Express, Request, Response } from "express";
import AuthMiddle from "./middlewares/AuthMiddle.js";
import { EmailServ } from "./services/EmailServ.js";
import { EmailType } from "./types/EmailTypes.js";
import { PrismaClient } from "@prisma/client";
import CryptoServ from "./services/CryptoServ.js";
import AuthRoute from "./routes/AuthRoute.js";
import { PORT } from "./utilis/constants.js";
import { log } from "console";

const app: Express = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());
app.use(AuthRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Bambu-mobile!");
});

app.post("/test", async (req: Request, res: Response) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
