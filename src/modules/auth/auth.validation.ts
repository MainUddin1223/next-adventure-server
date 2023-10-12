import Joi from 'joi';
import { roles } from './auth.constants';

export const signUpValidateSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.pattern.base': 'Invalid first name',
    'any.required': 'First name is required',
  }),
  last_name: Joi.string().required().messages({
    'string.pattern.base': 'Invalid last name',
    'any.required': 'Last name is required',
  }),
  role: Joi.string()
    .valid(roles[0], ...roles)
    .required()
    .messages({
      'any.required': 'Role field is required',
      'any.only': `Role field must be one of ${[...roles]}`,
    }),
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(5).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
  contact_no: Joi.string().required().messages({
    'string.pattern.base': 'Please enter a valid contact number',
    'any.required': 'Contact number is required',
  }),
  about_user: Joi.string().required().messages({
    'string.pattern.base': 'Please enter a valid Info',
    'any.required': 'About information is required',
  }),
  profile_img: Joi.string().required().messages({
    'string.pattern.base': 'Please enter a valid Profile image',
    'any.required': 'Profile img is required',
  }),
});
export const signinValidateSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(5).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
});
