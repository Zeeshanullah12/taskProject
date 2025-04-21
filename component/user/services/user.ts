import message from "../../../constant";
import { User } from "../model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export class UserService {
  public async get(args: any) {
    console.log("this is USer srvice");
    return args;
  }

  public async signUp(args: any): Promise<any> {
    let payload: any = args;
    if (payload.email) {
      let exist = await User.findOne({ email: args.email });
      if (exist) throw "This email is already used";
    }
    if (args.password) {
      let genSalt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(args.password, genSalt);
    }
    const user = await User.create({ ...args });
    if (!user) {
      const response = {
        success: false,
        data: { message: message.success.user.create },
      };
      return response;
    }
    const response = {
      success: true,
      data: {
        message: message.success.user.create,
        result: user,
      },
    };
    return response;
  }

  public async update(id: string, args: any): Promise<any> {
    try {
      let response = {};
      let obj: any = {};

      // Check for name or email update
      if (args.first_name) obj.first_name = args.first_name;
      if (args.last_name) obj.last_name = args.last_name;
      if (args.email) {
        let exist = await User.findOne({ email: args.email });
        if (exist && exist._id.toString() !== id) {
          throw "This email is already used";
        }
        obj.email = args.email;
      }

      const updatedUser = await User.findByIdAndUpdate({ _id: id }, obj, {
        new: true,
      });

      if (!updatedUser) {
        response = {
          success: false,
          message: message.error.user.update,
          data: {},
        };
      } else {
        response = {
          success: true,
          message: message.success.user.update,
          data: updatedUser,
        };
      }

      return response;
    } catch (error: any) {
      return {
        success: false,
        data: { message: error.message || error },
        status: error.status,
      };
    }
  }

  public async delete(id: string): Promise<any> {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: id },
        { is_deleted: true },
        { new: true }
      );

      if (!user) {
        return {
          success: false,
          message: message.error.user.delete,
          data: {},
        };
      }

      return {
        success: true,
        message: message.success.user.delete,
        data: user,
      };
    } catch (error: any) {
      return {
        success: false,
        data: { message: error.message || error },
        status: error.status,
      };
    }
  }

  public static async localLogin(req:Request,res: any): Promise<any> {
    try {
      let {password,email}:any=req.body;
      let filter: any = {
        email: new RegExp("^" + email + "$", "i")
      }
      let user = await User.findOne(filter)
      if (!user) throw  {message:'Incorrect email or password.', status:403};
      if (!await UserService.comparePassword(password, user.password)) {
        throw {message:'Incorrect email or password.', status:403};
      };
  
  
      let response = {
        first_name: user.first_name,
        last_name: user.first_name,
        email: user.email,
        _id: user._id
      }
     let  token= await UserService.createToken(user)
     return  res.status(200).json({ 
      success: true,  
      data: {
        message: 'login successfully',
        result: response,
        token: token,
  }
    })
  
    } catch (error: any) {
      console.log("zeesh")
      console.log(error)
     return  res.status(error.status || 500).json({ success: false, data: { message: error.message ||  error }, status: error.status || 500})
    }
  }

  public static async verifyUser(id:string) {
    try {
    return  await User.findById({_id:id}).select("-password")
    } catch (error:any) {
      return { success: false, error:  error.message||  error }
    }
  }

  public static async verifyToken(token: any) {
    try {
      const verifiedToken = await jwt.verify(token, `${process.env.JWT_SECRET}`)
      return { success: true, tokenBody: verifiedToken }
    } catch (error:any) {
      return { success: false, error:  error.message||  error }
    }
  }

  public static async comparePassword(providedPassword:string,hashedPassword: string){
    const isMatch = await bcrypt.compare(providedPassword, hashedPassword);
    return isMatch;  
}

public static async createToken(user: any) {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = await jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: "1h" });
  return token; 
}
}

export default UserService;
