import Joi from "joi-browser"

const emailRule = {
  email: Joi.string().email().min(5).max(255).trim().required(),
};

const passwordRule = {
  password: Joi.string()
    .regex(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$"))
    .required(),
};

const loginSchema = { ...emailRule, ...passwordRule };

export default loginSchema; 
