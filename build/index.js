"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ordsRunner_1 = __importDefault(require("./lib/ordsRunner"));
const ordsQueryBuilder_1 = __importDefault(require("./lib/ordsQueryBuilder"));
const ords = {
    runner: ordsRunner_1.default,
    builder: ordsQueryBuilder_1.default
};
exports.default = ords;
