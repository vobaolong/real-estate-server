"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const leaseControllers_1 = require("../controllers/leaseControllers");
const router = express_1.default.Router();
router.get('/', (0, authMiddleware_1.authMiddleware)(['manager', 'tenant']), leaseControllers_1.getLeases);
router.get('/:id/payments', (0, authMiddleware_1.authMiddleware)(['manager', 'tenant']), leaseControllers_1.getLeasePayments);
exports.default = router;
