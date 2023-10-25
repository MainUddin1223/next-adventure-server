'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateUpdateSchema =
  exports.signUpValidateSchema =
  exports.signinValidateSchema =
  exports.registerValidateSchema =
    void 0;
const joi_1 = __importDefault(require('joi'));
exports.registerValidateSchema = joi_1.default.object({
  first_name: joi_1.default.string().required().messages({
    'string.pattern.base': 'Invalid first name',
    'any.required': 'First name is required',
  }),
  last_name: joi_1.default.string().required().messages({
    'string.pattern.base': 'Invalid last name',
    'any.required': 'Last name is required',
  }),
  email: joi_1.default
    .string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: joi_1.default.string().min(5).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
  confirmPassword: joi_1.default.string().min(5).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
  contact_no: joi_1.default.string().required().messages({
    'string.pattern.base': 'Please enter a valid contact number',
    'any.required': 'Contact number is required',
  }),
  about_user: joi_1.default.string().required().messages({
    'string.pattern.base': 'Please enter a valid Info',
    'any.required': 'About information is required',
  }),
  profile_img: joi_1.default.string().required().messages({
    'string.pattern.base': 'Please enter a valid Profile image',
    'any.required': 'Profile img is required',
  }),
});
exports.signinValidateSchema = joi_1.default.object({
  email: joi_1.default
    .string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: joi_1.default.string().min(5).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
});
exports.signUpValidateSchema = joi_1.default.object({
  email: joi_1.default
    .string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: joi_1.default.string().min(5).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
  confirmPassword: joi_1.default.string().min(5).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
});
exports.validateUpdateSchema = joi_1.default.object({
  first_name: joi_1.default.string().optional().messages({
    'string.pattern.base': 'Invalid first name',
  }),
  last_name: joi_1.default.string().optional().messages({
    'string.pattern.base': 'Invalid last name',
  }),
  contact_no: joi_1.default.string().optional().messages({
    'string.pattern.base': 'Please enter a valid contact number',
  }),
  about_user: joi_1.default.string().optional().messages({
    'string.pattern.base': 'Please enter a valid Info',
  }),
  profile_img: joi_1.default.string().optional().messages({
    'string.pattern.base': 'Please enter a valid Profile image',
  }),
});
