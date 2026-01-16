import { Absence } from "../models/Absence.model";
import { Student } from "../models/Student.model";
import { School } from "../models/School.model";
import { CreateAbsenceInput } from "../validations/absence.schema";

export class AbsenceService {
    async createAbsence(userId:number, studentId: number, data: CreateAbsenceInput) {
        //verificar que el estudiante exista y sea del profesor correspondiente
        const student = await Student.findOne({
            where: { id: studentId },
            include: [{
                model: School,
                as: 'school',
                where: { user_id: userId }, // Asegura que la escuela pertenece al usuario
                required:true
            }]
        });

        if(!student){
            throw new Error("Estudiante no encontrado o no tienes acceso");
        }

        return await Absence.create({
            student_id: studentId,
            date:data.date,
            justified: data.justified ?? false
        });
    }

    async toggleJustification(absenceId: number, userId: number) {
        const absence = await Absence.findOne({
            where: { id: absenceId },
            include:[{
                model: Student,
                as: 'student',
                include:[{
                    model: School,
                    as:'School',
                    where: { user_id: userId },
                }]
            }]
        });

        if(!absence){
            throw new Error("Ausencia no encontrada o no tienes acceso");
        }

        return await absence.update({justified: !absence.justified});
    }

    async deleteAbsence(userId: number, absenceId: number) {
        const absence = await Absence.findOne({
            where: { id: absenceId },
            include: [{
                model: Student,
                as: 'student',
                include: [{
                    model: School,
                    as: 'school',
                    where: { user_id: userId }
                }]
            }]
        });

        if (!absence) throw new Error("Ausencia no encontrada o no tienes permisos");

        await absence.destroy();
        return true;
    }
}