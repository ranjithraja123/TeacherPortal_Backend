import Teacher from "../models/Teachers.js";

export const register = async (req,res) => {
    try{
        const {name,email,password} = req.body;

        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newTeacher = new Teacher({
            name,email,password
        })
        await newTeacher.save();
        const token = newTeacher.getSignedJwtToken()

        res.cookie('token',token,{httpOnly:true, secure: process.env.NODE_ENV === 'production'})
        res.status(200).json({message:'User created successfully', token})

        console.log('imHere')
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}


export const login = async (req,res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({error: 'Please provide both email and password'})
    }

    try{
        const teacher = await Teacher.findOne({email});

        if(!teacher){
            return res.status(401).json({message:'Invalid Credentials'})
        }

        const isMatch = await teacher.matchPassword(password);

        if(!isMatch){
            return res.status(401).json({message:'Invalid Credentials'})

        }

        const token = teacher.getSignedJwtToken()

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'Teacher logged in', token,teacher });




    } catch (err) {
        res.status(500).json({error: err.message})

    }

}

export const logout = (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0), secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Teacher logged out' });
  };