
import { addMultipleQuestions, addQuestion, getQuestions,getChapters, deleteQuestion } from '../controllers/questionHandler.js';
import { Router } from 'express';
import multer from 'multer';


const questionRouter = Router();

const upload = multer({ storage: multer.memoryStorage() });

questionRouter.post('/add-question', upload.single('questionImage'), addQuestion);
questionRouter.post('/add-multiple-questions', addMultipleQuestions);
questionRouter.get('/getQuestions', getQuestions);
questionRouter.get('/getChapters', getChapters);
questionRouter.post('/delete-question/:id', deleteQuestion);


export default questionRouter;