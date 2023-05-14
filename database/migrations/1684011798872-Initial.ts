import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1684011798872 implements MigrationInterface {
    name = 'Initial1684011798872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "advertisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "views" integer NOT NULL, "price" integer NOT NULL, "ownerId" character varying NOT NULL, "categoryId" character varying NOT NULL, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying, "userRegistrationId" character varying, "isRegistered" boolean NOT NULL, "role" character varying NOT NULL, "companyId" uuid, CONSTRAINT "UQ_f1920ce0e1a66e802b574593b86" UNIQUE ("userRegistrationId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order-item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying, "quantity" integer, "price" integer, "orderId" uuid, "productId" uuid, CONSTRAINT "PK_e06b16183c1f2f8b09f359ed572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "companyId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "status" character varying NOT NULL, "logoUrl" character varying, "companyRegistrationId" character varying, CONSTRAINT "UQ_1c2c1d1eb1cedd2b98b9a5fc124" UNIQUE ("companyRegistrationId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order-item" ADD CONSTRAINT "FK_29ee234059c3b7a783bddac5bf8" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order-item" ADD CONSTRAINT "FK_6811363ab71c6dca8ebc9db33f6" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_75c9ce255f89db219917013e0fc" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_75c9ce255f89db219917013e0fc"`);
        await queryRunner.query(`ALTER TABLE "order-item" DROP CONSTRAINT "FK_6811363ab71c6dca8ebc9db33f6"`);
        await queryRunner.query(`ALTER TABLE "order-item" DROP CONSTRAINT "FK_29ee234059c3b7a783bddac5bf8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order-item"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "advertisement"`);
    }

}
