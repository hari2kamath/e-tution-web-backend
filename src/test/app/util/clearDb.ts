import { Connection } from "typeorm";

export const clearDb = async (connection: Connection, entityName: string) => {
    const repository = await connection.getRepository(entityName);
    await repository.query(`DELETE FROM "${entityName}" CASCADE;`);
};
