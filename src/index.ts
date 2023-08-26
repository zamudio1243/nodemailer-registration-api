import express, { Express, Request, Response } from "express";
import Auth from "./middlewares/Auth.js";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(Auth.authenticateToken);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Bambu-mobile!");
});

app.post("/login", Auth.authenticateToken, (req: Request, res: Response) => {});

app.post("/signup", (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
