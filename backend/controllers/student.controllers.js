import Student from "../models/Students.js"

export const createOrUpdateStudent = async (req, res) => {
    try {
        const { name, subject, mark } = req.body;

        // Check if a student with the same name and subject exists
        let student = await Student.findOne({ name, subject });

        if (student) {
            // If student exists, update the mark
            student.mark = mark;
            await student.save();
            res.status(200).json({ message: 'Student updated successfully', student });
        } else {
            // If student does not exist, create a new one
            student = new Student({ name, subject, mark });
            await student.save();
            res.status(201).json({ message: 'Student created successfully', student });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const getAllStudents = async (req,res) => {
    try{
        const students = await Student.find();
        if(!students){
            return res.status(404).json({message:'Student not found'})
        }
            res.json(students)

        
    } catch (err) {
        res.status(500).json({error: err.message})

    }
}

export const getStudentById = async (req,res) => {
    try{
        const students = await Student.findById(req.params.id)
        if(!students) return res.status(404).json({message: 'students not found'})
        res.json(students)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}



export const updateStudentById = async (req,res) => {
    try {
        const students = await Student.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!students) return res.status(404).json({message:'Student not found'})
        res.json(students)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}


export const deleteStudentById = async (req,res) => {
    try{
        const students = await Student.findByIdAndDelete(req.params.id);
        if(!students) {
            return res.status(404).json({message:'Student not found'})
        }
        res.json({message:'Student deleted successfully'})
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}
