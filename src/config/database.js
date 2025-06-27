import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);

export const startDB = async()=>{
    try {
        await sequelize.authenticate();
        console.log("Se estableció la conexión con la base de datos.");
        await sequelize.sync();
    } catch (err) {
        console.log("Error al conectarse con la base de datos:", err);
    }
}