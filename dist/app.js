"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const router_1 = __importDefault(require("./router"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(config_1.default.api_route, router_1.default);
app.use('/test', (req, res) => {
    const message = `Server is running ${new Date()}`;
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message,
    });
});
app.use('/', (req, res) => {
    const message = `Server is running `;
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message,
    });
});
app.use((req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Not found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API not found',
            },
        ],
    });
    next();
});
exports.default = app;
