import { Router, type Request, type Response } from "express";

const healthRouter = Router();

healthRouter.get("/niyogzon-health", (_req: Request, res: Response) => {
  return res.send("Niyog zone server is running");
});

export default healthRouter
