import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEmailConfirmation1681130759984 implements MigrationInterface {
    name = 'UserEmailConfirmation1681130759984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "registrationId" character varying NOT NULL, "isEmailConfirmed" boolean NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_ef76971a08cd2b206095b4a4acf" UNIQUE ("registrationId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "advertisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "views" integer NOT NULL, "price" integer NOT NULL, "ownerId" character varying NOT NULL, "categoryId" character varying NOT NULL, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "advertisement"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
