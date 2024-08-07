import express from 'express'
import { createOrUpdateStudent, deleteStudentById, getAllStudents, getStudentById, updateStudentById } from '../controllers/student.controllers.js'
import { protect } from '../middlewares/auth.js'


const router = express.Router()

router.post('/',protect,createOrUpdateStudent)
router.get('/',protect,getAllStudents)
router.get('/:id',protect,getStudentById)
router.put('/:id',protect,updateStudentById)
router.delete('/:id',protect,deleteStudentById)







export default router
