
import {Request, Response} from 'express'
import { createBusinessDto} from '../request/business.dto'
import { BusinessService } from '../services'
import { ResponseWrapper} from '../../../helpers/response_wrapper'

export class BusinessController {

public static async registerBusiness(req: Request, res:Response ) {
    const busniessService: BusinessService = new BusinessService()
    const response: ResponseWrapper = new ResponseWrapper(res)
    return response.ok(await busniessService.registerBusiness(req))
}


}

export default BusinessController