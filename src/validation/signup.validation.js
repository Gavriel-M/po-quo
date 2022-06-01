import Joi from "joi-browser";

const emailRule = {
  email: Joi.string().email().min(5).max(255).trim().required(),
};

const passwordRule = {
  password: Joi.string()
    .regex(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$"))
    .required(),
  repeatPassword: Joi.ref("password"),
};

const firstnameRule = {
  firstName: Joi.string()
    .min(2)
    .max(127)
    .alphanum()
    .trim()
    .regex(new RegExp("^[A-Z][a-zA-Z0-9]+$"))
    .required(),
};

const lastnameRule = {
  lastName: Joi.string()
    .min(2)
    .max(127)
    .alphanum()
    .trim()
    .regex(new RegExp("^[A-Z][a-zA-Z0-9]+$"))
    .required(),
};

const userNameRule = {
  userName: Joi.string().min(2).max(127).required(),
};

const creatorAccountRule = {
  creatorAccount: Joi.boolean().required(),
};

const signupSchema = {
  ...firstnameRule,
  ...lastnameRule,
  ...userNameRule,
  ...emailRule,
  ...passwordRule,
  ...creatorAccountRule,
};

export default signupSchema;