import Joi from "joi-browser";

const passwordSchema = {
  password: Joi.string()
    .regex(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$"))
    .required(),
  repeatPassword: Joi.ref("password"),
};

export default passwordSchema;
