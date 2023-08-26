import express, { Express, Request, Response } from "express";
import Auth from "./middlewares/Auth.js";
import { EmailServ } from "./services/EmailServ.js";

const app: Express = express();
const port = 3000;

app.use(express.json());
//app.use(Auth.authenticateToken);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Bambu-mobile!");
});

app.post("/login", Auth.authenticateToken, (req: Request, res: Response) => {});

app.post("/signup", (req: Request, res: Response) => {});

app.post("/reset-password/:token", (req: Request, res: Response) => {});

app.post("/test", async (req: Request, res: Response) => {
  const host = req.headers.host;
  const mail = new EmailServ();
  await mail.sendMail("zamudio1243@gmail.com", "token", { host, port });
  return res.send("Email sent");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
