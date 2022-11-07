import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667851760376 implements MigrationInterface {
    name = 'createTables1667851760376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" double precision NOT NULL, "age" integer NOT NULL, "launch" date NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "description" character varying NOT NULL, "developer" character varying NOT NULL, "image" character varying NOT NULL, "categoryId" uuid, "favoriteId" uuid, CONSTRAINT "UQ_28639e6be5f363b0257ec04e14f" UNIQUE ("name"), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" double precision NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchased" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "aquisitonAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_571589b6e6476f23e7704a23d5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "age" integer NOT NULL, "email" character varying NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "favoriteId" uuid, "cartId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_7b31a0cceebe227198a8f3620d" UNIQUE ("favoriteId"), CONSTRAINT "REL_89502c44bd22c06e714c31c1e9" UNIQUE ("cartId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_infos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "number" character varying(120) NOT NULL, "dueDate" date NOT NULL, "code" character varying(3) NOT NULL, "userId" uuid, CONSTRAINT "PK_ccb7464329b1faa3eed32b3ab1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_games_games" ("cartId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_0dcd2092d7bc69ae55a5977ca94" PRIMARY KEY ("cartId", "gamesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_83ea183cc87a536a24dccb0861" ON "cart_games_games" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_07e21dcb58a4e77e7301695403" ON "cart_games_games" ("gamesId") `);
        await queryRunner.query(`CREATE TABLE "purchased_games_games" ("purchasedId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_675b0e010ca789fb4e8c6aa6171" PRIMARY KEY ("purchasedId", "gamesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf30bcd9bce38502cda3e498a7" ON "purchased_games_games" ("purchasedId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58a4e163134c1a91959c5e0fca" ON "purchased_games_games" ("gamesId") `);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_d32b1cc688490c835546ccf230a" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_bec7d6b02549364f11ccd789f00" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchased" ADD CONSTRAINT "FK_29635ed8d4a51dfbae3abb263ed" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7b31a0cceebe227198a8f3620dd" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_infos" ADD CONSTRAINT "FK_dc7ebfd062b3622340ad75a893f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_games_games" ADD CONSTRAINT "FK_83ea183cc87a536a24dccb08613" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_games_games" ADD CONSTRAINT "FK_07e21dcb58a4e77e73016954031" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchased_games_games" ADD CONSTRAINT "FK_bf30bcd9bce38502cda3e498a74" FOREIGN KEY ("purchasedId") REFERENCES "purchased"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purchased_games_games" ADD CONSTRAINT "FK_58a4e163134c1a91959c5e0fcaa" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchased_games_games" DROP CONSTRAINT "FK_58a4e163134c1a91959c5e0fcaa"`);
        await queryRunner.query(`ALTER TABLE "purchased_games_games" DROP CONSTRAINT "FK_bf30bcd9bce38502cda3e498a74"`);
        await queryRunner.query(`ALTER TABLE "cart_games_games" DROP CONSTRAINT "FK_07e21dcb58a4e77e73016954031"`);
        await queryRunner.query(`ALTER TABLE "cart_games_games" DROP CONSTRAINT "FK_83ea183cc87a536a24dccb08613"`);
        await queryRunner.query(`ALTER TABLE "payment_infos" DROP CONSTRAINT "FK_dc7ebfd062b3622340ad75a893f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7b31a0cceebe227198a8f3620dd"`);
        await queryRunner.query(`ALTER TABLE "purchased" DROP CONSTRAINT "FK_29635ed8d4a51dfbae3abb263ed"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_bec7d6b02549364f11ccd789f00"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_d32b1cc688490c835546ccf230a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58a4e163134c1a91959c5e0fca"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf30bcd9bce38502cda3e498a7"`);
        await queryRunner.query(`DROP TABLE "purchased_games_games"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07e21dcb58a4e77e7301695403"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83ea183cc87a536a24dccb0861"`);
        await queryRunner.query(`DROP TABLE "cart_games_games"`);
        await queryRunner.query(`DROP TABLE "payment_infos"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "purchased"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
    }

}
