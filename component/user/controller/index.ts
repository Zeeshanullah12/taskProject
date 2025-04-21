import { Request, Response } from "express";
import { createUserDto, updateUserDto } from "../request/user.dto";
import { UserService } from "../services";
import { ResponseWrapper } from "../../../helpers/response_wrapper";

export class UserController {
  public static async index(req: Request, res: Response) {
    const userService: UserService = new UserService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.ok(await userService.get(req));
  }

  public static async signUp(req: Request, res: Response) {
    const userService: UserService = new UserService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    const payload: createUserDto = req.body;
    return response.created(await userService.signUp(payload));
  }

  public static async update(req: Request, res: Response) {
    const response: ResponseWrapper = new ResponseWrapper(res);

    const payload: updateUserDto = req.body;
    const id: string = req.params.id;
    const userService: UserService = new UserService();

    return response.created(await userService.update(id, payload));
  }

  public static async delete(req: Request, res: Response) {
    const id: string = req.params.id;
    const userService: UserService = new UserService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.created(await userService.delete(id));
  }
}

export default UserController;
