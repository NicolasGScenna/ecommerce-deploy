import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderProductsRelation1787614595215 implements MigrationInterface {
    name = 'AddOrderProductsRelation1787614595215'

public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "orders"
        DROP CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592"
    `);

    await queryRunner.query(`
        ALTER TABLE "orders"
        DROP CONSTRAINT "UQ_749e30f71cc0d2d95f8546f4592"
    `);

    await queryRunner.query(`
        ALTER TABLE "orders"
        DROP COLUMN "orderDetailId"
    `);

    await queryRunner.query(`
        ALTER TABLE "orders"
        ALTER COLUMN "date" SET DEFAULT now()
    `);
}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details_products_products" DROP CONSTRAINT "FK_df657e601f53f706e4b7d253c30"`);
        await queryRunner.query(`ALTER TABLE "order_details_products_products" DROP CONSTRAINT "FK_35bbcf9515eab2382bd417b385f"`);
        await queryRunner.query(`ALTER TABLE "order_details" DROP CONSTRAINT "FK_147bc15de4304f89a93c7eee969"`);
        await queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "REL_147bc15de4304f89a93c7eee96" UNIQUE ("orderId")`);
        await queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "FK_147bc15de4304f89a93c7eee969" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "orderDetailId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "UQ_749e30f71cc0d2d95f8546f4592" UNIQUE ("orderDetailId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df657e601f53f706e4b7d253c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35bbcf9515eab2382bd417b385"`);
        await queryRunner.query(`DROP TABLE "order_details_products_products"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592" FOREIGN KEY ("orderDetailId") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
