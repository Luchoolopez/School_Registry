import { DataTypes, Optional, Model } from "sequelize";

import { sequelize } from "../config/database";

interface AbsenceAttributes {
    id: number;
    student_id: number;
    date: string;
    justified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type AbsenceCreationAttributes = Optional<AbsenceAttributes, 'id'>;

export class Absence extends Model<AbsenceAttributes, AbsenceCreationAttributes> implements AbsenceAttributes {
    public id!: number;
    public student_id!: number;
    public date!:string;
    public justified!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Absence.init(
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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        justified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false,
        },
    },
    {
        sequelize,
        modelName: "Absence",
        tableName: "absences",
        timestamps: true,
        underscored: true,
        indexes: [
            {
                unique:true,
                fields: ['student_id', 'date']
            }
        ]
    }
);