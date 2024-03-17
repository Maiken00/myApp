import express from 'express';
import bcrypt from 'bcrypt';
import client from '../postgresql.mjs';

const LOGIN_API = express.Router();
LOGIN_API.use(express.json());

LOGIN_API.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await client.query(query, [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(400).json({ error: 'Invalid email or password' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default LOGIN_API;