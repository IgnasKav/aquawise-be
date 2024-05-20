import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserFitlersTable1716197920405 implements MigrationInterface {
    name = 'AddUserFitlersTable1716197920405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user-filters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filtersJSON" character varying NOT NULL, CONSTRAINT "PK_9918250e0fdc3aaefb6863e3eac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "filtersId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_173ed174576d8d75756963795b5" UNIQUE ("filtersId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_173ed174576d8d75756963795b5" FOREIGN KEY ("filtersId") REFERENCES "user-filters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_173ed174576d8d75756963795b5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_173ed174576d8d75756963795b5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "filtersId"`);
        await queryRunner.query(`DROP TABLE "user-filters"`);
    }

}
