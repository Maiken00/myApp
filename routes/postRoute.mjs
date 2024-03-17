import express from 'express';

const POST_API = express.Router();


POST_API.get('/', (req, res) => {
    const posts = [{
        title: 'task 1',
        createdAt: Date.now(),
        description: 'Do the washing'
    },
    {
        title: 'task 2',
        createdAt: Date.now(),
        description: 'Workout'
    }]
    
    res.render('todo', {posts: posts })
});

POST_API.get('/new', (req, res) => {
    res.render('new')
});

POST_API.post('/', (req, res) => {

});



export default POST_API;