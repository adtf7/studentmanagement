
import mongoose,{Schema,Document} from "mongoose";
import {type Istudent } from "../interfaces/student.js";

interface IstudentModel extends Istudent,Document {}

const studentSchema:Schema=new Schema({
    name:{type:String,require:true},
    age:{type:Number,require:true},
    grade:{type:String,require:true}
});

export default mongoose.model<IstudentModel>("Student",studentSchema);