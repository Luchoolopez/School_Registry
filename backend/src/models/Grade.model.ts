import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface GradeAttributes {
    id: number;
    student_id: number;
    concept: string;
    value: number;
    date: Date | string; 
}

export type GradeCreationAttributes = Optional<GradeAttributes, 'id'>;

export class Grade extends Model<GradeAttributes, GradeCreationAttributes> implements GradeAttributes {
    public id!: number;
    public student_id!: number;
    public concept!: string;
    public value!: number;
    public date!: Date | string;
}

Grade.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        concept: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY, 
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'grades',
        timestamps: true,
        underscored: true,
    }
);