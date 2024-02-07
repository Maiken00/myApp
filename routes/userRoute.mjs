import express, { response } from "express";
import User from "../modules/user.mjs";
import { HTTPCodes } from "../modules/httpConstants.mjs";
import hashPassword from "../modules/passwordHasher.mjs";




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
            req.body.pswhash = await hashPassword(password);
            next();
        } catch (error) {
            console.error('Error hashing password:' , error);
        }
    } else {
        res.status(400).json({ error: 'Missing password field' });
    }
});

USER_API.post('/', (req, res) => {
    
    const { name, email, pswHash } = req.body;
    if (name && email && pswHash) {

        const exists = users.some(user => user.email === email);
            if (!exists) {

                const user = new User();
                user.name = name;
                user.email = email; 
                user.pswHash = pswHash;

                users.push(user);

                res.status(HTTPCodes.SuccesfullRespons.Ok).json({ message: 'User registered succefully' });
            } else {
                res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).json({ error: 'User already exists' });
            }
    } else {
        res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).json({ error: 'missing data fields' });
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