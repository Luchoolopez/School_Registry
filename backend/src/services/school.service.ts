import { School } from "../models/School.model";
import { CreateSchoolInput, UpdateSchoolInput } from "../validations/school.schema";

export class SchoolService {
    async createSchool(userId: number, data: CreateSchoolInput) {
        const existingSchool = await School.findOne({
            where: {
                user_id: userId,
                name: data.name,
                academic_year: data.academic_year
            }
        });

        if (existingSchool) {
            throw new Error(`Ya tienes registrada la escuela "${data.name}" para el año ${data.academic_year}`);
        }

        return await School.create({
            ...data,
            user_id: userId
        })
    }

    async getUsersSchools(userId: number) {
        return await School.findAll({
            where: { user_id: userId },
            order: [['academic_year', 'DESC'], ['name', 'ASC']]
        });
    }

    async updateSchool(schoolId: number, userId: number, data: UpdateSchoolInput) {
        const school = await School.findOne({
            where: { id: schoolId, user_id: userId }
        });
        if (!school) {
            throw new Error("Escuela no encontrada o no autorizada");
        }
        return await school.update(data);
    }

    async deleteSchool(schoolId: number, userId: number) {
        const deletedCount = await School.destroy({
            where: {
                id: schoolId,
                user_id: userId
            }
        });

        if (deletedCount === 0) throw new Error('Escuela no encontrada o no tienes permisos');

        return true;
    }

    // Restaurar escuela borrada por error
    /*async restoreSchool(schoolId: number, userId: number) {
        const school = await School.findOne({
            where: { id: schoolId, user_id: userId },
            paranoid: false 
        });

        if (!school) throw new Error('Escuela no encontrada');

        await school.restore(); 
        return school;
    }*/

}