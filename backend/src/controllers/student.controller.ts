import { StudentService } from "../services/student.service";
import { Request, Response } from "express";

export class StudentController {
    private studentService: StudentService;

    constructor() {
        this.studentService = new StudentService();
    }

    createStudent = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { schoolId } = req.params; //:schoolId

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
            }

            if (!schoolId || isNaN(Number(schoolId))) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de escuela invalido'
                })
            }

            const student = await this.studentService.createStudent(
                userId,
                Number(schoolId),
                req.body
            );

            return res.status(201).json({
                success: true,
                message: 'Alumno creado exitosamente',
                data: student
            });

        } catch (error: any) {
            if (error.message.includes('no encontrada') || error.message.includes('acceso')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Error al crear el alumno',
                error: error.message
            });
        }
    }

    getStudentsBySchool = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { schoolId } = req.params;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
            }

            if (!schoolId || isNaN(Number(schoolId))) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de escuela invalido'
                })
            }

            const students = await this.studentService.getStudentsBySchool(userId, Number(schoolId));

            return res.status(200).json({
                success: true,
                data: students
            });
        } catch (error: any) {
            if (error.message.includes('no encontrada') || error.message.includes('acceso')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Error al obtener los alumnos',
                error: error.message
            });
        }
    }

    getStudentById = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
            }

            if (!id || isNaN(Number(id))) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de alumno inválido'
                })
            }

            const student = await this.studentService.getStudentById(userId, Number(id));

            return res.status(200).json({
                success: true,
                data: student
            });
        } catch (error: any) {
            if (error.message.includes('no encontrada') || error.message.includes('acceso')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Error al obtener el alumno',
                error: error.message
            });
        }
    }

    updateStudent = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
            }

            const updatedStudent = await this.studentService.updateStudent(
                userId,
                Number(id),
                req.body
            );

            return res.status(200).json({
                success: true,
                message: 'Alumno actualizado exitosamente',
                data: updatedStudent
            });
        } catch (error: any) {

            if (error.message.includes('no encontrada') || error.message.includes('acceso')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Error al actualizar el alumno',
                error: error.message
            });
        }
    }

    deleteStudent = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
            }
            await this.studentService.deleteStudent(
                userId,
                Number(id)
            );
            return res.status(200).json({
                success: true,
                message: 'Alumno eliminado exitosamente'
            });
        } catch (error: any) {
            if (error.message.includes('no encontrada') || error.message.includes('acceso')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Error al eliminar el alumno',
                error: error.message
            });
        }
    }
}