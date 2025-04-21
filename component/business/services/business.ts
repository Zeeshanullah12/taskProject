import message from "../../../constant"
import { Business } from '../model'
export class BusinessService {

    public async get(args: any) {
        console.log("this is USer srvice")
        return args
    }

    public async registerBusiness(args: any): Promise<any> {
        let payload = args.body
        
            const response = {
                success: false,
                data: { message: message.success.user.create },
            }
            return response

    }
}

export default BusinessService