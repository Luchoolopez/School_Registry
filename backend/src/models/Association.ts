import { User } from "./User.model";
import { School } from "./School.model";
import { Student } from "./Student.model";
import { Grade } from "./Grade.model";
import { Absence } from "./Absence.model";

export const setupAssociations = () => {
    // 1. Usuario <-> Escuelas
    User.hasMany(School, { foreignKey: 'user_id', as: 'schools' });
    School.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    // 2. Escuela <-> Alumnos
    // Al borrar una escuela, se borran sus alumnos (Cascade)
    School.hasMany(Student, { foreignKey: 'school_id', as: 'students', onDelete: 'CASCADE' });
    Student.belongsTo(School, { foreignKey: 'school_id', as: 'school' });

    // 3. Alumno <-> Notas
    Student.hasMany(Grade, { foreignKey: 'student_id', as: 'grades', onDelete: 'CASCADE' });
    Grade.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });

    // 4. Alumno <-> Ausencias
    Student.hasMany(Absence, { foreignKey: 'student_id', as: 'absences', onDelete: 'CASCADE' });
    Absence.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });

};