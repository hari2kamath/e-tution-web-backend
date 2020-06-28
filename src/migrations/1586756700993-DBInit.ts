import {MigrationInterface, QueryRunner} from "typeorm";

export class DBInit1586756700993 implements MigrationInterface {
    name = 'DBInit1586756700993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "my_app_service"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "address" character varying, CONSTRAINT "PK_42ad789bc8bb27f29a7f1a642b0" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "my_app_service"."user"`, undefined);
    }

}
