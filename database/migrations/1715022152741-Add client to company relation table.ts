import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClientToCompanyRelationTable1715022152741 implements MigrationInterface {
    name = 'AddClientToCompanyRelationTable1715022152741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company-client-relation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyId" uuid NOT NULL, "clientId" character varying NOT NULL, CONSTRAINT "PK_7f9916d5636e229a0068988460c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company-client-relation" ADD CONSTRAINT "FK_37e317ea4af39b08ab9b85280a9" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company-client-relation" ADD CONSTRAINT "FK_43e8faaeee4542548e142f299c4" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company-client-relation" DROP CONSTRAINT "FK_43e8faaeee4542548e142f299c4"`);
        await queryRunner.query(`ALTER TABLE "company-client-relation" DROP CONSTRAINT "FK_37e317ea4af39b08ab9b85280a9"`);
        await queryRunner.query(`DROP TABLE "company-client-relation"`);
    }

}
