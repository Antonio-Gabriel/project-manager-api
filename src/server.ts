import express, { Request, Response, NextFunction } from "express";
import { resolve } from 'path'
import cors from "cors";

import "reflect-metadata";
import "express-async-errors";

import { router } from "./routes";
import { AppError } from "./errors";

import './database';
import './config/env'

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(resolve(__dirname, '..', 'uploads')))
app.use(router);

app.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Hello word " });
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);


app.listen(1111, () => console.log("Server running."));
