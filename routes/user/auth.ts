import express from 'express'
const router = express.Router()
import {UserValidator} from '../../component/user/validator'
import {UserService} from '../../component/user/services'
import { wrapper } from '../../helpers/exception_wrapper'
import Schema from '../../middlewares/schema';
import mongoose from 'mongoose';
mongoose.set('strictPopulate', false);
router.post(
  '/local/login',
  (req, res, next) => {
    Schema.handle(req, res, next, UserValidator.signInLocallyValidation())
  },
  wrapper(UserService.localLogin),
)

// router.post("/logout",wrapper(UserService.logout),);


export default router













