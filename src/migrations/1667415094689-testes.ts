import { MigrationInterface, QueryRunner } from "typeorm";

export class testes1667415094689 implements MigrationInterface {
    name = 'testes1667415094689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "payment_infos" ALTER COLUMN "dueDate" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_infos" ALTER COLUMN "dueDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "isActive"`);
    }

}
