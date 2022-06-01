import Joi from "joi-browser";

const emailRule = {
  email: Joi.string().email().min(5).max(255).trim().required(),
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

const updateUserSchema = {
  ...firstnameRule,
  ...lastnameRule,
  ...userNameRule,
  ...emailRule,
  ...creatorAccountRule,
};

export default updateUserSchema;
