import Joi from 'joi'


class BusinessValidator {
  public registerBusinessValidation() {
    return Joi.object({
      business_name: Joi.string().required(),
      Business_logo: Joi.string().optional(),
      business_phone: Joi.string().required(),
      address: Joi.string().required(),
      //
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      password: Joi.string().required(),
      status: Joi.string().required(),
      prifle_picture: Joi.string().optional(),
    })
  }
}

export default new BusinessValidator()