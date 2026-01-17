import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../config/database";

interface UserAttributes {
    id: number;
    username: string;
    dni:string;
    email: string;
    password: string;
    role: 'admin' | 'docente';
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'active'>;

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public username!: string;
    public dni!:string;
    public email!: string;
    public password!: string;
    public role!: 'admin' | 'docente';
    public active!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        dni:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'docente'),
            allowNull: false,
            defaultValue: 'docente',
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        underscored: true,
    }
)