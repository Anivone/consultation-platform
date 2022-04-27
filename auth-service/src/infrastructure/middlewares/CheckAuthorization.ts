import { Action } from "routing-controllers";

export function authorizationChecker(action: Action, roles: string[]) {
    return true;
}