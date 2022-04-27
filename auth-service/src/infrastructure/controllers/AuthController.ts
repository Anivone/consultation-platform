import {
  Body, CurrentUser,
  Get,
  JsonController,
  Post,
  Req,
  Res,
} from "routing-controllers";
import { User } from "../../domain/entities/User";
import { Request, Response } from "express";
import { UserProps } from "../../domain/entities/types";

interface LoginProps {
  email: string;
  password: string;
}

@JsonController()
export class AuthController {

  @Get('/currentUser')
  async currentUser(@CurrentUser() user: User | null) {
    if (!user) return { currentUser: null };

    const currentUser: Partial<UserProps> = user;
    delete currentUser.password;
    delete currentUser.ratingId;

    return { currentUser };
  }

  @Post("/login")
  async login(@Req() req: Request, @Res() res: Response, @Body() body: LoginProps) {
    const { authService } = req.container.cradle;
    const { email, password } = body;

    const [user, jwtToken] = await authService.login(email, password);

    res.cookie("jwt", jwtToken);

    return { user };
  }

  @Post("/signup")
  async signup(@Req() req: Request, @Res() res: Response, @Body() body: User) {
    const { authService } = req.container.cradle;

    const [user, jwtToken] = await authService.signup(body);

    res.cookie("jwt", jwtToken);

    return { user };
  }
}
