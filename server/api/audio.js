import express from 'express';
import audioController from '../controller/audioController.js';
import { check } from 'express-validator';

const api = express.Router();

api.post('/audio', [
    check('title').notEmpty().withMessage('Title is required'),
    check('artist').notEmpty().withMessage('Artist is required'),
    check('audioUrl').notEmpty().withMessage('URL is required'),
], audioController.create);

api.get('/audio', audioController.getAll);
api.get('/audio/:id', audioController.getById);
api.put('/audio/:id', audioController.update);
api.delete('/audio/:id', audioController.delete);

export default api;
