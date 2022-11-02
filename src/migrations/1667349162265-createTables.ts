import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667349162265 implements MigrationInterface {
    name = 'createTables1667349162265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric(12,2) NOT NULL, "age" integer NOT NULL, "launch" date NOT NULL DEFAULT now(), "description" character varying NOT NULL, "developer" character varying NOT NULL, "idCategoryId" uuid, CONSTRAINT "UQ_28639e6be5f363b0257ec04e14f" UNIQUE ("name"), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" double precision NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data_insert" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_infos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "number" character varying(120) NOT NULL, "dueDate" date NOT NULL DEFAULT now(), "code" character varying(3) NOT NULL, CONSTRAINT "PK_ccb7464329b1faa3eed32b3ab1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "age" integer NOT NULL, "email" character varying NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "paymentInfoId" uuid, "favoriteId" uuid, "cartId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_8cd3b57fedc2bc5eccd61ee240" UNIQUE ("paymentInfoId"), CONSTRAINT "REL_7b31a0cceebe227198a8f3620d" UNIQUE ("favoriteId"), CONSTRAINT "REL_89502c44bd22c06e714c31c1e9" UNIQUE ("cartId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchased" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "aquisitonAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_571589b6e6476f23e7704a23d5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_products_games" ("cartId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_419aa175c6ce188b78f4a0cf83d" PRIMARY KEY ("cartId", "gamesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a0e4da61618bc0726e1222876b" ON "cart_products_games" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a2b1b84197988b90db35f9f5b" ON "cart_products_games" ("gamesId") `);
        await queryRunner.query(`CREATE TABLE "favorite_products_games" ("favoriteId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_33e0c1a6333c795bd9dc7d09883" PRIMARY KEY ("favoriteId", "gamesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9c82c1e8f6b75b2e62cdfc278b" ON "favorite_products_games" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_99e2d83d5f4488b3324e086927" ON "favorite_products_games" ("gamesId") `);
        await queryRunner.query(`CREATE TABLE "purchased_products_games" ("purchasedId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_d616eda3580378d0ce584624583" PRIMARY KEY ("purchasedId", "gamesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_250295cc1ccadb37f546e98590" ON "purchased_products_games" ("purchasedId") `);
        await queryRunner.query(`CREATE INDEX "IDX_20c40799a01e932e6efc828e10" ON "purchased_products_games" ("gamesId") `);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_627b481e1a72711c73e416eae65" FOREIGN KEY ("idCategoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8cd3b57fedc2bc5eccd61ee2409" FOREIGN KEY ("paymentInfoId") REFERENCES "payment_infos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7b31a0cceebe227198a8f3620dd" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchased" ADD CONSTRAINT "FK_29635ed8d4a51dfbae3abb263ed" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products_games" ADD CONSTRAINT "FK_a0e4da61618bc0726e1222876bd" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_games" ADD CONSTRAINT "FK_8a2b1b84197988b90db35f9f5b0" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_products_games" ADD CONSTRAINT "FK_9c82c1e8f6b75b2e62cdfc278b2" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_products_games" ADD CONSTRAINT "FK_99e2d83d5f4488b3324e0869279" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchased_products_games" ADD CONSTRAINT "FK_250295cc1ccadb37f546e985904" FOREIGN KEY ("purchasedId") REFERENCES "purchased"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchased_products_games" ADD CONSTRAINT "FK_20c40799a01e932e6efc828e104" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchased_products_games" DROP CONSTRAINT "FK_20c40799a01e932e6efc828e104"`);
        await queryRunner.query(`ALTER TABLE "purchased_products_games" DROP CONSTRAINT "FK_250295cc1ccadb37f546e985904"`);
        await queryRunner.query(`ALTER TABLE "favorite_products_games" DROP CONSTRAINT "FK_99e2d83d5f4488b3324e0869279"`);
        await queryRunner.query(`ALTER TABLE "favorite_products_games" DROP CONSTRAINT "FK_9c82c1e8f6b75b2e62cdfc278b2"`);
        await queryRunner.query(`ALTER TABLE "cart_products_games" DROP CONSTRAINT "FK_8a2b1b84197988b90db35f9f5b0"`);
        await queryRunner.query(`ALTER TABLE "cart_products_games" DROP CONSTRAINT "FK_a0e4da61618bc0726e1222876bd"`);
        await queryRunner.query(`ALTER TABLE "purchased" DROP CONSTRAINT "FK_29635ed8d4a51dfbae3abb263ed"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7b31a0cceebe227198a8f3620dd"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8cd3b57fedc2bc5eccd61ee2409"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_627b481e1a72711c73e416eae65"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_20c40799a01e932e6efc828e10"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_250295cc1ccadb37f546e98590"`);
        await queryRunner.query(`DROP TABLE "purchased_products_games"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99e2d83d5f4488b3324e086927"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c82c1e8f6b75b2e62cdfc278b"`);
        await queryRunner.query(`DROP TABLE "favorite_products_games"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a2b1b84197988b90db35f9f5b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a0e4da61618bc0726e1222876b"`);
        await queryRunner.query(`DROP TABLE "cart_products_games"`);
        await queryRunner.query(`DROP TABLE "purchased"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "payment_infos"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
