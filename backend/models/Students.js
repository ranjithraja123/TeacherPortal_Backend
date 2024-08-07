import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    subject:{
        type:String,
        required: true
    },
    mark:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Student = mongoose.model('Students',studentSchema)
export default Student


