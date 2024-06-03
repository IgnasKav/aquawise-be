import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeClientEntity1714939729606 implements MigrationInterface {
    name = 'ChangeClientEntity1714939729606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client_companies_company" ("clientId" character varying NOT NULL, "companyId" uuid NOT NULL, CONSTRAINT "PK_778a2c71aba15607fa14d21e37a" PRIMARY KEY ("clientId", "companyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a7b4e39784baf4cc5c1bdf8e1e" ON "client_companies_company" ("clientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c721a10c88f90befb69816798" ON "client_companies_company" ("companyId") `);
        await queryRunner.query(`ALTER TABLE "client_companies_company" ADD CONSTRAINT "FK_a7b4e39784baf4cc5c1bdf8e1e3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_companies_company" ADD CONSTRAINT "FK_0c721a10c88f90befb698167981" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_companies_company" DROP CONSTRAINT "FK_0c721a10c88f90befb698167981"`);
        await queryRunner.query(`ALTER TABLE "client_companies_company" DROP CONSTRAINT "FK_a7b4e39784baf4cc5c1bdf8e1e3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c721a10c88f90befb69816798"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7b4e39784baf4cc5c1bdf8e1e"`);
        await queryRunner.query(`DROP TABLE "client_companies_company"`);
    }

}
