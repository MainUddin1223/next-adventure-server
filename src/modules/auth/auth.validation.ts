import Joi from 'joi';

export const registerValidateSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.pattern.base': 'Invalid first name',
    'any.required': 'First name is required',
  }),
  last_name: Joi.string().required().messages({
    'string.pattern.base': 'Invalid last name',
    'any.required': 'Last name is required',
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
  confirmPassword: Joi.string().min(5).max(16).required().messages({
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

export const signUpValidateSchema = Joi.object({
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
  confirmPassword: Joi.string().min(5).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
});

export const validateUpdateSchema = Joi.object({
  first_name: Joi.string().optional().messages({
    'string.pattern.base': 'Invalid first name',
  }),
  last_name: Joi.string().optional().messages({
    'string.pattern.base': 'Invalid last name',
  }),
  contact_no: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid contact number',
  }),
  about_user: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid Info',
  }),
  profile_img: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid Profile image',
  }),
});
