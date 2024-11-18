import { DataSource } from "typeorm";
import { contactsEntity } from "./entities/contact.entity";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any, // 'mysql'
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [contactsEntity],
    synchronize: true,
    logging: true,
    extra: {
        ssl: {
            ca: fs.readFileSync(process.env.DB_SSL_CA || "").toString(),
        },
    },
});
