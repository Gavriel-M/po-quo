import Joi from "joi-browser";

const emailSchema = {
  email: Joi.string().email().min(5).max(255).trim().required(),
};

export default emailSchema; 
