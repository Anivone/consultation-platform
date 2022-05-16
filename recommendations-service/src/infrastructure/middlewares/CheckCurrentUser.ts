import { Action } from "routing-controllers";
import to from "await-to-js";
import { CustomNotAuthorizedError } from "../errors/CustomNotAuthorizedError";
import { UserDTO } from "../dtos/UserDTO";
import jwt from "jsonwebtoken";

export async function checkCurrentUser(action: Action) {
  const { authRepository } = action.request.container.cradle;

  const jwtToken = action.request.cookies.jwt;

  if (!jwtToken) return null;

  let verified: UserDTO | undefined;
  try {
    verified = jwt.verify(jwtToken, process.env.JWT_KEY!) as UserDTO;
  } catch (err) {}

  if (!verified) return null;

  const [err, user] = await to(authRepository.getById(verified.id));
  if (err) throw new CustomNotAuthorizedError();

  return user as UserDTO;
}
