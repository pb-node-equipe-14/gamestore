import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1667319190399 implements MigrationInterface {
    name = 'createUser1667319190399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_infos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "number" character varying(120) NOT NULL, "dueDate" date NOT NULL DEFAULT now(), "code" character varying(3) NOT NULL, CONSTRAINT "PK_ccb7464329b1faa3eed32b3ab1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "age" integer NOT NULL, "email" character varying NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "paymentInfoId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_8cd3b57fedc2bc5eccd61ee240" UNIQUE ("paymentInfoId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8cd3b57fedc2bc5eccd61ee2409" FOREIGN KEY ("paymentInfoId") REFERENCES "payment_infos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8cd3b57fedc2bc5eccd61ee2409"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "payment_infos"`);
    }

}
