import { Action } from "routing-controllers";
import jwt from "jsonwebtoken";
import { CustomNotAuthorizedError } from "../errors/CustomNotAuthorizedError";
import { CustomForbiddenError } from "../errors/CustomForbiddenError";
import { UserDTO } from "../dtos/UserDTO";

export enum Roles {
  CONSULTANT = "consultant",
  CUSTOMER = "customer",
}

export async function checkAuthorization(action: Action, roles: string[]) {
  const jwtToken = action.request.cookies.jwt;

  if (!jwtToken) throw new CustomNotAuthorizedError();

  let verified: UserDTO;
  try {
    verified = jwt.verify(jwtToken, process.env.JWT_KEY!) as UserDTO;
  } catch (err) {
    throw new CustomNotAuthorizedError();
  }

  if (!roles.length) return true;

  const role = verified.isConsultant ? Roles.CONSULTANT : Roles.CUSTOMER;
  if (!roles.find((r) => r === role)) {
    throw new CustomForbiddenError();
  }

  return true;
}
