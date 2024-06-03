import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveIsRegisteredColFromUser1707168870016 implements MigrationInterface {
    name = 'RemoveIsRegisteredColFromUser1707168870016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isRegistered"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_1c2c1d1eb1cedd2b98b9a5fc124"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "companyRegistrationId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "companyRegistrationId" character varying`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_1c2c1d1eb1cedd2b98b9a5fc124" UNIQUE ("companyRegistrationId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isRegistered" boolean NOT NULL`);
    }

}
