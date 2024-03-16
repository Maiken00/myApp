import express, { response } from "express";
import User from "../modules/user.mjs";
import { HTTPCodes } from "../modules/httpConstants.mjs";
import hashPassword from "../modules/passwordHasher.mjs";
import client from '../postgresql.mjs';




const USER_API = express.Router();
USER_API.use(express.json()); 

const users = [];

USER_API.get("/", (req, res) => {
    res.send(users)
});

USER_API.get('/:id', (req, res, next) => {
    res.send("User New Form")

})
 
USER_API.use(async (req, res, next) => {
    const { password } = req.body;
    if (password) {
        try {
            req.body.pswHash = await hashPassword(password);
            next();
        } catch (error) {
            console.error('Error hashing password:' , error);
        }
    } else {
        res.status(400).json({ error: 'Missing password field' });
    }
});

USER_API.post('/', async (req, res) => {
    const { name, email, pswHash } = req.body;

    try {
        const existsQuery = 'SELECT * FROM users WHERE email = $1';
        const existsResult = await client.query(existsQuery, [email]);
        if (existsResult.rows.length === 0) {
            const insertQuery = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
            await client.query(insertQuery, [name, email, pswHash]);
            res.status(HTTPCodes.SuccesfullRespons.Ok).json({ message: 'User registered successfully' });
        } else {
            res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).json({ error: 'User already exists' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

USER_API.get("/:id", (req, res) => {
    req.params.id
    res.send("get user with ID " + req.params.id)
})

USER_API.put('/:id', (req, res) => {

})

USER_API.delete('/:id', (req, res) => {

})

export default USER_API