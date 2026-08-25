import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordLenght1787667822348 implements MigrationInterface {
    name = 'PasswordLenght1787667822348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "password" TYPE varchar(100)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "password" TYPE varchar(20)
        `);
    }
}
