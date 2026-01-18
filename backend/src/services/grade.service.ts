import { Grade } from "../models/grade.model";
import { Student } from "../models/student.model";
import { School } from "../models/school.model";
import { CreateGradeInput, UpdateGradeInput } from "../validations/grade.schema";

export class GradeService {
    async addGrade(userId: number, studentId: number, data: CreateGradeInput) {
        const student = await Student.findOne({
            where: { id: studentId },
            include:[{
                model: School,
                as: 'school',
                where: { user_id: userId },
                required:true
            }]
        });

        if(!student){
            throw new Error('Alumno no encontrado o no tienes acceso');
        }

        return await Grade.create({
            student_id: studentId,
            concept: data.concept,
            value: data.value,
            date: data.date
        });
    }

    async updateGrade(userId: number, gradeId: number, data: UpdateGradeInput) {
        const grade = await Grade.findOne({
            where: { id: gradeId },
            include:[{
                model: Student,
                as: 'student',
                include:[{
                    model: School,
                    as: 'school',
                    where: { user_id: userId },
                    required: true
                }]
            }]
        });

        if(!grade){
            throw new Error('Nota no encontrada o no tienes acceso');
        }

        return await grade.update(data);
    }

    async deleteGrade(userId: number, gradeId: number) {
        const grade = await Grade.findOne({
            where: { id: gradeId },
            include: [{
                model: Student,
                as: 'student',
                required: true,
                include: [{
                    model: School,
                    as: 'school',
                    where: { user_id: userId },
                    required: true
                }]
            }]
        });

        if(!grade){
            throw new Error('Nota no encontrada o no tienes permisos');
        }

        await grade.destroy();
        return true;
    }
}