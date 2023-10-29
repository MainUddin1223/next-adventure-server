"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlanSchema = exports.createPlanSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPlanSchema = joi_1.default.object({
    plan_name: joi_1.default.string().required().messages({
        'string.pattern.base': 'Invalid plan name',
        'any.required': 'Plan name is required',
    }),
    images: joi_1.default.array().items(joi_1.default.string()).required().messages({
        'array.base': 'Atleast one image is required',
        'array.includes': 'Images must be strings',
        'any.required': 'Images are required',
    }),
    starting_location: joi_1.default.string().required().messages({
        'string.pattern.base': 'Invalid starting location',
        'any.required': 'Starting location is required',
    }),
    price: joi_1.default.number().precision(2).required().messages({
        'number.base': 'Invalid price',
        'number.precision': 'Price must have 2 decimal places',
        'any.required': 'Price is required',
    }),
    cover_location: joi_1.default.array().items(joi_1.default.string().messages({
        'array.base': 'Atleast one cover location is required',
        'array.includes': 'Cover location must be strings',
        'any.required': 'Cover location is required',
    })),
    events: joi_1.default.array()
        .items(joi_1.default.string().required().messages({
        'array.base': 'Atleast one event is required',
        'array.includes': 'Event must be strings',
        'any.required': 'Event is required',
    }))
        .required(),
    tour_duration: joi_1.default.number().integer().min(1).required().messages({
        'number.base': 'Invalid tour duration',
        'number.integer': 'Tour duration must be an integer',
        'number.min': 'Tour duration must be a positive integer',
        'any.required': 'Tour duration is required',
    }),
    starting_time: joi_1.default.date().required().messages({
        'date.base': 'Invalid starting time',
        'any.required': 'Starting time is required',
    }),
    total_meals: joi_1.default.number().integer().min(1).required().messages({
        'number.base': 'Invalid total meals',
        'number.integer': 'Total meals must be an integer',
        'number.min': 'Total meals must be a positive integer',
        'any.required': 'Total meals is required',
    }),
    description: joi_1.default.string().required().messages({
        'string.pattern.base': 'Invalid description',
        'any.required': 'Description is required',
    }),
    destination: joi_1.default.string().required().messages({
        'string.pattern.base': 'Invalid destination',
        'any.required': 'Destination is required',
    }),
    booking_deadline: joi_1.default.date().required().messages({
        'date.base': 'Invalid booking deadline',
        'any.required': 'Booking deadline is required',
    }),
});
exports.updatePlanSchema = joi_1.default.object({
    plan_name: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Invalid plan name',
    }),
    images: joi_1.default.array().items(joi_1.default.string()).optional().messages({
        'array.base': 'Atleast one image is required',
        'array.includes': 'Images must be strings',
    }),
    starting_location: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Invalid starting location',
    }),
    price: joi_1.default.number().optional().messages({
        'number.base': 'Invalid price',
    }),
    cover_location: joi_1.default.array()
        .optional()
        .items(joi_1.default.string().messages({
        'array.base': 'Atleast one cover location is required',
        'array.includes': 'Cover location must be strings',
    })),
    events: joi_1.default.array()
        .items(joi_1.default.string().messages({
        'array.includes': 'Event must be strings',
    }))
        .optional(),
    tour_duration: joi_1.default.number().integer().min(1).optional().messages({
        'number.base': 'Invalid tour duration',
        'number.integer': 'Tour duration must be an integer',
        'number.min': 'Tour duration must be a positive integer',
    }),
    starting_time: joi_1.default.date().optional().messages({
        'date.base': 'Invalid starting time',
    }),
    total_meals: joi_1.default.number().integer().min(1).optional().messages({
        'number.base': 'Invalid total meals',
        'number.integer': 'Total meals must be an integer',
        'number.min': 'Total meals must be a positive integer',
    }),
    description: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Invalid description',
    }),
    booking_deadline: joi_1.default.date().optional().messages({
        'date.base': 'Invalid booking deadline',
    }),
});
// Example usage and validation handling remain the same.
