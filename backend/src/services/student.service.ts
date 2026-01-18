import { Student } from "../models/student.model";
import { School } from "../models/school.model";
import { Grade } from "../models/grade.model";
import { Absence } from "../models/absence.model";
import { CreateStudentInput, UpdateStudentInput } from "../validations/student.schema";

export class StudentService {
    async createStudent(userId: number, schoolId: number, data: CreateStudentInput) {
        const school = await School.findOne({
            where: { id: schoolId, user_id: userId }
        });

        if (!school) {
            throw new Error("Escuela no encontrada o no tienes acceso");
        }

        return await Student.create({
            ...data,
            school_id: schoolId
        });
    }

    async getStudentsBySchool(userId: number, schoolId: number) {
        const school = await School.findOne({
            where: { id: schoolId, user_id: userId }
        });

        if (!school) {
            throw new Error("Escuela no encontrada o no tienes acceso");
        };

        return await Student.findAll({
            where: { school_id: schoolId },
            include: [
                { model: Grade, as: 'grades' }, //para calcular promedio en el front
                { model: Absence, as: 'absences' }//para mostrar total de faltas en el front
            ],
            order: [['last_name', 'ASC'], ['first_name', 'ASC']]
        });
    }

    async getStudentById(userId: number, studentId: number) {
        const student = await Student.findOne({
            where: { id: studentId },
            include: [
                {
                    model: School,
                    as: 'school',
                    where: { user_id: userId },
                    attributes: []
                },
                { model: Grade, as: 'grades' },
                { model: Absence, as: 'absences' }
            ]
        });
        if (!student) {
            throw new Error("Alumno no encontrado o no tienes acceso");
        }
        return student;
    }

    async updateStudent(userId: number, studentId: number, data: UpdateStudentInput) {
        const student = await this.getStudentById(userId, studentId);
        return await student.update(data);
    }

    //por ahora no hago un soft delete, en el futuro veo si lo cambio 
    async deleteStudent(userId: number, studentId: number) {
        const student = await this.getStudentById(userId, studentId);
        await student.destroy();
        return true;
    }
}