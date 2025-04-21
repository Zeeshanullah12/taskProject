/**
 *        @file check_auth.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary Check Authentication Class
 * @description Authentication middleware that checks logged in user scope
 *     @service - UserService
 *   @functions - check()
 */

import { ResponseWrapper } from '../helpers/response_wrapper'
import {UserService} from '../component/user/services'
import { Response, Request, NextFunction } from 'express'

export class CheckAuth 
{
  public async check(req: Request, res: Response, next: NextFunction, permission: string) 
  {
    const response: ResponseWrapper = new ResponseWrapper(res)

    const token = req.headers.authorization?.split(' ')[1]
    if (!token || token === "null" || token === "undefined") {
      return response.created({ success: false, data: { message: "You dont have permission ",tokenInvalid:true }, status: 401 })
    }

    const vToken:any = await UserService.verifyToken(token)

    if (!vToken.success) {
      return response.created({ success: false, data: { message: vToken.error }, status: 401 })
    }
    const cUser:any = vToken.tokenBody
    const verifyUser = await UserService.verifyUser(cUser.id)

    if (!verifyUser) 
    {
      return response.created({ success: false, data: { message: "Invalid Token",verifyUser:false, tokenInvalid:true , }, status: 401 })
    }
    if (cUser) {
      // @ts-ignore: Unreachable code error
      req.user = verifyUser
    }
    return next()
  
  }

}

export default new CheckAuth()
