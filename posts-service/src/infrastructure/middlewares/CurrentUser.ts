import { UserDTO } from "../dtos/UserDTO";
import jwt from "jsonwebtoken";
import { MyRequest } from "../../config/AwilixContainer";
import { NextFunction, Response } from "express";

export async function currentUser(
  req: MyRequest,
  res: Response,
  next: NextFunction
) {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken) return null;

  let verified: UserDTO | null = null;
  try {
    verified = jwt.verify(jwtToken, process.env.JWT_KEY!) as UserDTO;
  } catch (err) {}

  req.currentUser = verified;
  next();
}