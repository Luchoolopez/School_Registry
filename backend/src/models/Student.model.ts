import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface StudentAttributes {
    id: number;
    school_id: number;
    first_name: string;
    last_name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type StudentCreationAttributes = Optional<StudentAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
    public id!: number;
    public school_id!: number;
    public first_name!: string;
    public last_name!: string;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Student.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        school_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'students',
        timestamps: true,
        underscored: true, 
    }
);