import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreateAndChangeDateToProduct1716674664330 implements MigrationInterface {
    name = 'AddCreateAndChangeDateToProduct1716674664330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "createDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "changeDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "changeDate"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createDate"`);
    }

}
