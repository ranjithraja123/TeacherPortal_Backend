import  jwt  from "jsonwebtoken";
import Student from "../models/Students.js";

//middleware to protect the route using jsonwebtokens
export const protect = async (req,res,next) => {
    let token;
    console.log("roken1",req.cookies)

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
      console.log("roken1",token)

    if(!token) {
        return res.status(401).json({message: 'You are not logged in! Please log'})
    }
    

    try {

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.students = await Student.findById(decoded.id);
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Not authorized to access this route' });

    }
}