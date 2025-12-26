"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./util/db");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/users', async (req, res) => {
    try {
        const result = await db_1.pool.query('SELECT * FROM public.lolik_info_db');
        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error server" });
    }
});
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }
        const result = await db_1.pool.query(`INSERT INTO public.lolik_info_db (lolik_name, lolik_email, lolik_password)
            VALUES ($1, $2, $3) RETURNING id, lolik_name, lolik_email`, [name, email, password]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error server' });
    }
});
app.listen(config_1.PORT, () => {
    console.log('Work');
});
//# sourceMappingURL=index.js.map