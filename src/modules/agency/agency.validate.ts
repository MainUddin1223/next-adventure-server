import Joi from 'joi';

export const createPlanSchema = Joi.object({
  plan_name: Joi.string().required().messages({
    'string.pattern.base': 'Invalid plan name',
    'any.required': 'Plan name is required',
  }),
  images: Joi.array().items(Joi.string()).required().messages({
    'array.base': 'Atleast one image is required',
    'array.includes': 'Images must be strings',
    'any.required': 'Images are required',
  }),
  starting_location: Joi.string().required().messages({
    'string.pattern.base': 'Invalid starting location',
    'any.required': 'Starting location is required',
  }),
  price: Joi.number().precision(2).required().messages({
    'number.base': 'Invalid price',
    'number.precision': 'Price must have 2 decimal places',
    'any.required': 'Price is required',
  }),
  cover_location: Joi.array().items(
    Joi.string().messages({
      'array.base': 'Atleast one cover location is required',
      'array.includes': 'Cover location must be strings',
      'any.required': 'Cover location is required',
    })
  ),
  events: Joi.array()
    .items(
      Joi.string().required().messages({
        'array.base': 'Atleast one event is required',
        'array.includes': 'Event must be strings',
        'any.required': 'Event is required',
      })
    )
    .required(),
  tour_duration: Joi.number().integer().min(1).required().messages({
    'number.base': 'Invalid tour duration',
    'number.integer': 'Tour duration must be an integer',
    'number.min': 'Tour duration must be a positive integer',
    'any.required': 'Tour duration is required',
  }),
  starting_time: Joi.date().required().messages({
    'date.base': 'Invalid starting time',
    'any.required': 'Starting time is required',
  }),
  total_meals: Joi.number().integer().min(1).required().messages({
    'number.base': 'Invalid total meals',
    'number.integer': 'Total meals must be an integer',
    'number.min': 'Total meals must be a positive integer',
    'any.required': 'Total meals is required',
  }),
  description: Joi.string().required().messages({
    'string.pattern.base': 'Invalid description',
    'any.required': 'Description is required',
  }),
  booking_deadline: Joi.date().required().messages({
    'date.base': 'Invalid booking deadline',
    'any.required': 'Booking deadline is required',
  }),
});

// Example usage and validation handling remain the same.
