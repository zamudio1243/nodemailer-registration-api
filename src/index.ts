import express, { Express, Request, Response } from "express";
import AuthMiddle from "./middlewares/AuthMiddle.js";
import AuthRoute from "./routes/AuthRoute.js";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(AuthRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Bambu-mobile!");
});

app.post(
  "/protected",
  AuthMiddle.authenticateToken,
  async (req: Request, res: Response) => {
    res.send("Excelent you are authenticated");
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
