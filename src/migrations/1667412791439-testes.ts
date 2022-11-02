import { MigrationInterface, QueryRunner } from "typeorm";

export class testes1667412791439 implements MigrationInterface {
    name = 'testes1667412791439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" ADD "image" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "image"`);
    }

}
