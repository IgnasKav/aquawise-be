import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeClientEntity1714935092680 implements MigrationInterface {
    name = 'ChangeClientEntity1714935092680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_3d7a0b6e0f1d0c0ab1bc189645f"`);
        await queryRunner.query(`CREATE TABLE "company_clients_client" ("companyId" uuid NOT NULL, "clientId" character varying NOT NULL, CONSTRAINT "PK_b06b57ef14aebf9cf5666f703da" PRIMARY KEY ("companyId", "clientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b8626bd5c0c0916a7c0cc4552d" ON "company_clients_client" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1260b550299c7bc2e5fb53682b" ON "company_clients_client" ("clientId") `);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company_clients_client" ADD CONSTRAINT "FK_b8626bd5c0c0916a7c0cc4552dc" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "company_clients_client" ADD CONSTRAINT "FK_1260b550299c7bc2e5fb53682be" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_clients_client" DROP CONSTRAINT "FK_1260b550299c7bc2e5fb53682be"`);
        await queryRunner.query(`ALTER TABLE "company_clients_client" DROP CONSTRAINT "FK_b8626bd5c0c0916a7c0cc4552dc"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "companyId" uuid`);
        await queryRunner.query(`ALTER TABLE "client" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1260b550299c7bc2e5fb53682b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b8626bd5c0c0916a7c0cc4552d"`);
        await queryRunner.query(`DROP TABLE "company_clients_client"`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_3d7a0b6e0f1d0c0ab1bc189645f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
