import express from 'express';
import Classroom from '../models/classroom.js';
import {checkForAuth, teacherOnly} from '../middleware/auth.js'

const router = express.Router();

router.get('/get', checkForAuth, async(req, res)=>{

})

router.get('/:id', checkForAuth, async(req, res)=>{

})

router.post('/create', checkForAuth, teacherOnly, async(req, res)=>{

})

router.post('/join', checkForAuth, async(req, res)=>{
  
})

export default router;