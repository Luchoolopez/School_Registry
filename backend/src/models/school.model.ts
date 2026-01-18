import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../config/database";

interface SchoolAttributes {
    id: number;
    user_id:number;
    name: string;
    academic_year: number;
    createdAt?: Date;
    updatedAt?: Date;
    deleteAt?: Date;
}

export type SchoolCreationAttributes = Optional<SchoolAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class School extends Model<SchoolAttributes, SchoolCreationAttributes>
    implements SchoolAttributes {
    public id!: number;
    public user_id!:number;
    public name!: string;
    public academic_year!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

School.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        academic_year:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    },
    {
        sequelize,
        tableName:'schools',
        timestamps:true,
        paranoid:true, //activa el soft delete automatico 
        underscored:true,
    }
);