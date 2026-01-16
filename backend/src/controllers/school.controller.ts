import { SchoolService } from "../services/school.service";
import { Request, Response } from "express";

export class SchoolController {
    private schoolService: SchoolService;

    constructor() {
        this.schoolService = new SchoolService();
    }

    createSchool = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
            }

            const school = await this.schoolService.createSchool(userId, req.body);

            res.status(201).json({
                success: true,
                message: 'Escuela creada exitosamente',
                data: school
            });
        } catch (error: any) {
            if (error.message.includes('Ya tienes registrada')) {
                return res.status(400).json({ success: false, message: error.message });
            }

            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    getUsersSchools = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;

            if (!userId) return res.status(401).json({ message: 'No autorizado' });

            const schools = await this.schoolService.getUsersSchools(userId);

            res.status(200).json({
                success: true,
                message: 'Escuelas obtenidas exitosamente',
                data: schools
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    getSchoolById = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params;

            if (!id || isNaN(Number(id))) return res.status(400).json({success:false, message: 'ID de escuela inválido' });
            if (!userId) return res.status(401).json({ success:false, message: 'No autorizado' });
            
            const school = await this.schoolService.getSchoolById(Number(id), userId);

            res.status(200).json({
                success: true,
                message: 'Escuela obtenida exitosamente',
                data: school
            });
        } catch (error: any) {
            if (error.message.includes('no encontrada')) {
                return res.status(404).json({ success: false, message: error.message });
            }
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    updateSchool = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params;

            if (!userId) return res.status(401).json({ message: 'No autorizado' });
            if (!id || isNaN(Number(id))) return res.status(400).json({ message: 'ID de escuela inválido' });

            const school = await this.schoolService.updateSchool(Number(id), userId, req.body);

            res.status(200).json({
                success: true,
                message: 'Escuela actualizada exitosamente',
                data: school
            });
        } catch (error: any) {
            if (error.message === 'Escuela no encontrada') {
                return res.status(404).json({ success: false, message: error.message });
            }
            res.status(500).json({ success: false, message: error.message });
        }
    }

    deleteSchool = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params;

            if (!userId) return res.status(401).json({ message: 'No autorizado' });
            if (!id || isNaN(Number(id))) return res.status(400).json({ message: 'ID de escuela inválido' });

            await this.schoolService.deleteSchool(Number(id), userId);

            res.status(200).json({
                success: true,
                message: 'Escuela eliminada exitosamente'
            });
        } catch (error: any) {
            if (error.message.includes('no encontrada') || error.message.includes('permisos')) {
                return res.status(404).json({ success: false, message: error.message });
            }
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }
}