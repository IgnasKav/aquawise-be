import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderRelations1685296214089 implements MigrationInterface {
    name = 'AddOrderRelations1685296214089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_7b73ae9d3b6ceb003d8e3fa6f0a"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "serialNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "responsibleUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_3d7a0b6e0f1d0c0ab1bc189645f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_5cecca3c67dae081440fa47ada1" FOREIGN KEY ("responsibleUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_5cecca3c67dae081440fa47ada1"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_3d7a0b6e0f1d0c0ab1bc189645f"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "responsibleUserId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "serialNumber"`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_7b73ae9d3b6ceb003d8e3fa6f0a" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
