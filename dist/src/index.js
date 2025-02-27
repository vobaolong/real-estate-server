"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const authMiddleware_1 = require("./middleware/authMiddleware");
/* ROUTE IMPORT */
const tenantRoutes_1 = __importDefault(require("./routes/tenantRoutes"));
const managerRoutes_1 = __importDefault(require("./routes/managerRoutes"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
const leaseRoutes_1 = __importDefault(require("./routes/leaseRoutes"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, morgan_1.default)('common'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
/* ROUTES */
app.get('/', (req, res) => {
    res.send('This is home route');
});
app.use('/applications', applicationRoutes_1.default);
app.use('/properties', propertyRoutes_1.default);
app.use('/leases', leaseRoutes_1.default);
app.use('/tenants', (0, authMiddleware_1.authMiddleware)(['tenant']), tenantRoutes_1.default);
app.use('/managers', (0, authMiddleware_1.authMiddleware)(['manager']), managerRoutes_1.default);
/* SERVER */
const port = Number(process.env.PORT) || 3002;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
