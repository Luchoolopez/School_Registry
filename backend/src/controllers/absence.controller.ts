import { Request, Response } from 'express';
import { AbsenceService } from '../services/absence.service';

export class AbsenceController {
    private absenceService: AbsenceService;

    constructor() {
        this.absenceService = new AbsenceService();
    }

    createAbsence = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { studentId } = req.params;

            if (!userId) {
                return res.status(401).json({ success: false, message: 'No autorizado' });
            }

            const absence = await this.absenceService.createAbsence(
                userId,
                Number(studentId),
                req.body
            );

            return res.status(201).json({
                success: true,
                message: 'Falta registrada',
                data: absence
            });
        } catch (error: any) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe una falta registrada para este alumno en esa fecha.',
                    error: 'Duplicado'
                });
            }

            if (error.message.includes('no encontrada') || error.message.includes('acceso')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Error al registrar la falta',
                error: error.message
            });
        }
    }

    toggleJustification = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params; //id de la ausencia


            if (!userId) {
                return res.status(401).json({ success: false, message: 'No autorizado' });
            }

            const absence = await this.absenceService.toggleJustification(
                Number(id),
                userId
            );

            return res.status(200).json({
                success: true,
                message: 'Estado de justificacion actualizado',
                data: absence
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
                message: 'Error al actualizar la justificación',
                error: error.message
            });
        }
    }

    deleteAbsence = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params; //id de la ausencia

            if (!userId) {
                return res.status(401).json({ success: false, message: 'No autorizado' });
            }

            await this.absenceService.deleteAbsence(userId, Number(id));

            return res.status(200).json({
                success: true,
                message: 'Falta eliminada exitosamente'
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
                message: 'Error al eliminar la ausencia',
                error: error.message
            });
        }
    }
}