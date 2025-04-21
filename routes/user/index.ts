import Router from "express";

const router = Router();

import Schema from "../../middlewares/schema";
import {UserValidator} from '../../component/user/validator'
// import CheckAuth from '../../middlewares/check_auth'
import { wrapper } from '../../helpers/exception_wrapper'
import { UserController } from '../../component/user/controller'
import CheckAuth from "../../middlewares/check_auth";

router.post(
  '/sign-up',
  (req, res, next) => {
    Schema.handle(req, res, next, UserValidator.signUpValidation())
  },
  wrapper(UserController.signUp),
)

router.put(
  '/:id',
  (req, res, next) => {
    Schema.handle(req, res, next, UserValidator.updateValidation())
  },

    (req, res, next) => {
      CheckAuth.check(req, res, next, '')
    },
  wrapper(UserController.update),
)

router.delete(
  '/:id',
    (req, res, next) => {
      CheckAuth.check(req, res, next, '')
    },
  wrapper(UserController.delete),
)



export default router
