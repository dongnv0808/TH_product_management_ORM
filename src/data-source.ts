import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppdDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: 'root',
    password: '123456aA@',
    database: "dbBook",
    synchronize: false,
    logging: false,
    entities: ["dist/src/entity/*.js"],
    // migrations: ["dist/src/migrations/*.js"]
})