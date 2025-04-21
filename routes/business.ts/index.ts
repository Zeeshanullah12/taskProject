import Router from "express";

const router = Router();

import Schema from "../../middlewares/schema";
import {BusinessValidator} from '../../component/business/validator'
// import CheckAuth from '../../middlewares/check_auth'
import { wrapper } from '../../helpers/exception_wrapper'
import { BusinessController } from '../../component/business/controller'

router.post(
  '/business',
  (req, res, next) => {
    Schema.handle(req, res, next, BusinessValidator.registerBusinessValidation())
  },
  wrapper(BusinessController.registerBusiness),
)

export default router
