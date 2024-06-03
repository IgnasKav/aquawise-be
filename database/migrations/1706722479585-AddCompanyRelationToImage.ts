import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyRelationToImage1706722479585 implements MigrationInterface {
    name = 'AddCompanyRelationToImage1706722479585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "logoUrl"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "companyId" uuid`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_63ae87e64b25d503974dee435bb" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_63ae87e64b25d503974dee435bb"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "logoUrl" character varying`);
    }

}
