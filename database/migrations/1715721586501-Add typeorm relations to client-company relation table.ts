import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypeormRelationsToClientCompanyRelationTable1715721586501 implements MigrationInterface {
    name = 'AddTypeormRelationsToClientCompanyRelationTable1715721586501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company-client-relation" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "company-client-relation" ADD "companyId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company-client-relation" ADD CONSTRAINT "FK_43e8faaeee4542548e142f299c4" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company-client-relation" ADD CONSTRAINT "FK_37e317ea4af39b08ab9b85280a9" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company-client-relation" DROP CONSTRAINT "FK_37e317ea4af39b08ab9b85280a9"`);
        await queryRunner.query(`ALTER TABLE "company-client-relation" DROP CONSTRAINT "FK_43e8faaeee4542548e142f299c4"`);
        await queryRunner.query(`ALTER TABLE "company-client-relation" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "company-client-relation" ADD "companyId" character varying NOT NULL`);
    }

}
