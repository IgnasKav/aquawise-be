import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApplicationId1683229197397 implements MigrationInterface {
    name = 'AddApplicationId1683229197397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "applicationId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "applicationId"`);
    }

}
