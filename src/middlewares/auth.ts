import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  token: string;
}

export function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send({ error: "JWT Token is missing!" });
  }

  const [, token] = authHeader.split(" ");

  try {
    verify(token, String(process.env.APP_SECRET)) as IPayload;

    next();
  } catch {
    return response.status(401).send({ error: "JWT Token is missing!" });
  }
}
