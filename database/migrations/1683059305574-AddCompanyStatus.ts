import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyStatus1683059305574 implements MigrationInterface {
    name = 'AddCompanyStatus1683059305574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "status"`);
    }

}
