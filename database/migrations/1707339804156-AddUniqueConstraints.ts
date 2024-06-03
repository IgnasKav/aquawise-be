import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraints1707339804156 implements MigrationInterface {
    name = 'AddUniqueConstraints1707339804156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_711bd226b17871ae73cecca8f79" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_711bd226b17871ae73cecca8f79"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    }

}
