import StudentModel from "../models/studentModel.js";
import {type Istudent} from "../interfaces/student.js";





export const addStudent = async (student: Istudent): Promise<Istudent | null> => {
  const name = (student.name || "").trim().replace(/\s+/g, " ");
  const grade = (student.grade || "").trim();

  const isNameValid = /^[A-Za-z\s]+$/.test(name);
  const isGradeValid =
    /^[A-F][+-]?$/.test(grade) ||
    /^(?:[1-9]|1[0-2])(?:st|nd|rd|th)$/i.test(grade);

  if (!name || !isNameValid || !isGradeValid) {
    return null;
  }

  const escapeRegex = (t: string) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const nameExist = await StudentModel.findOne({
    name: { $regex: `^${escapeRegex(name)}$`, $options: "i" }
  });

  if (nameExist) return null;

  return await StudentModel.create({ ...student, name, grade });
};



export const getAllStudents= async():Promise<Istudent[]>=>{
    return await StudentModel.find()
}

export const getStudentById = async(id:string):Promise<Istudent|null>=>{

    return await StudentModel.findById(id)
}



export const updateStudent = async (id: string, student: Istudent): Promise<Istudent | null> => {
  const name = (student.name || "").trim().replace(/\s+/g, " ");
  const grade = (student.grade || "").trim();


  const isNameValid = /^[A-Za-z\s]+$/.test(name);

  const escapeRegex = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const isGradeValid =
    /^[A-F][+-]?$/.test(grade) ||
    /^(?:[1-9]|1[0-2])(?:st|nd|rd|th)$/i.test(grade);

  if (!name || !isNameValid || !isGradeValid) return null;

  const nameExists = await StudentModel.findOne({
    _id: { $ne: id },
    name: { $regex: `^${escapeRegex(name)}$`, $options: "i" }
  });

  if (nameExists) return null;

  return await StudentModel.findByIdAndUpdate(
    id,
    { ...student, name, grade },
    { new: true }
  );
};



export const deleteStudent = async(id:string):Promise<Istudent|null>=>{
    return await StudentModel.findByIdAndDelete(id)
}