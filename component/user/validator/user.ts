import Joi from 'joi'


class UserValidator {
  public signUpValidation() {
    return Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(40).required(),
      status: Joi.string(),
    })
  }

  public updateValidation() {
    return Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
    })
  }

  public signInLocallyValidation() {
    return Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
  }
}

export default new UserValidator()