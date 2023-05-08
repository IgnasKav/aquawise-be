import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1683488225383 implements MigrationInterface {
    name = 'Initial1683488225383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "status" character varying NOT NULL, "logoUrl" character varying, "companyRegistrationId" character varying, CONSTRAINT "UQ_1c2c1d1eb1cedd2b98b9a5fc124" UNIQUE ("companyRegistrationId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying, "userRegistrationId" character varying, "isRegistered" boolean NOT NULL, "role" character varying NOT NULL, "companyId" uuid, CONSTRAINT "UQ_f1920ce0e1a66e802b574593b86" UNIQUE ("userRegistrationId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
