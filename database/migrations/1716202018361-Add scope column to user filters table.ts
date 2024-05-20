import { MigrationInterface, QueryRunner } from "typeorm";

export class AddScopeColumnToUserFiltersTable1716202018361 implements MigrationInterface {
    name = 'AddScopeColumnToUserFiltersTable1716202018361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-filters" DROP COLUMN "filtersJSON"`);
        await queryRunner.query(`ALTER TABLE "user-filters" ADD "scope" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user-filters" ADD "filterJSON" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user-filters" ADD "userId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-filters" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user-filters" DROP COLUMN "filterJSON"`);
        await queryRunner.query(`ALTER TABLE "user-filters" DROP COLUMN "scope"`);
        await queryRunner.query(`ALTER TABLE "user-filters" ADD "filtersJSON" character varying NOT NULL`);
    }

}
