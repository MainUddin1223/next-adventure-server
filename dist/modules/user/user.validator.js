'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.reviewSchema = void 0;
const joi_1 = __importDefault(require('joi'));
exports.reviewSchema = joi_1.default.object({
  rating: joi_1.default.number().required().max(5).messages({
    'number.base': 'Please enter a valid rating',
    'number.required': 'Rating is required',
    'number.max': 'Rating must be less than or equal to 5',
  }),
  review_description: joi_1.default.string().required().messages({
    'string.pattern.base': 'Please give valid description',
    'any.required': 'Description is required',
  }),
});
