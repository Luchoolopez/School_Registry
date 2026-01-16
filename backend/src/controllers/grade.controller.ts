import { Request, Response } from "express";
import { GradeService } from "../services/grade.service";

export class GradeController {
    private gradeService: GradeService;
    constructor() {
        this.gradeService = new GradeService();
    }

    createGrade = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { studentId } = req.params;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
            }

            const grade = await this.gradeService.addGrade(
                userId,
                Number(studentId),
                req.body
            );

            return res.status(201).json({
                success: true,
                message: 'Nota registrada exitosamente',
                data: grade
            })
        } catch (error: any) {
            if (error.message.includes('no encontrada') || error.message.includes('acceso')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Error al registrar la nota',
                error: error.message
            });
        }
    }

    updateGrade = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params; //id de la nota

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
            }

            const grade = await this.gradeService.updateGrade(
                userId,
                Number(id),
                req.body
            );

            return res.status(200).json({
                success: true,
                message: 'Nota actualizada exitosamente',
                data: grade
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
                message: 'Error al actualizar la nota',
                error: error.message
            });
        }
    }

    deleteGrade = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params; //id de la nota

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
            }

            await this.gradeService.deleteGrade(userId, Number(id));

            return res.status(200).json({
                success: true,
                message: 'Nota eliminada exitosamente'
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
                message: 'Error al eliminar la nota',
                error: error.message
            });
        }
    }
}