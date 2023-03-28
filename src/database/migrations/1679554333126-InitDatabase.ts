import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1679554333126 implements MigrationInterface {
    name = 'InitDatabase1679554333126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`username\` text NOT NULL, \`description\` text NULL, \`type\` enum ('1', '2') NOT NULL DEFAULT '1', \`status\` tinyint NOT NULL COMMENT '0: Inactive, 1: Active.' DEFAULT '1', \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`password\` text NOT NULL, \`full_name\` varchar(255) NULL, \`email\` varchar(255) NULL, \`mobile\` varchar(20) NULL, \`avatar\` varchar(255) NULL, \`status\` tinyint NOT NULL COMMENT '0: Inactive, 1: Active.' DEFAULT '1', \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`refresh_token\` text NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_29fd51e9cf9241d022c5a4e02e\` (\`mobile\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_room\` (\`room_id\` int UNSIGNED NOT NULL, \`user_id\` int UNSIGNED NOT NULL, PRIMARY KEY (\`room_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_room\` ADD CONSTRAINT \`FK_b61991bf7b0e617ca5ed577bded\` FOREIGN KEY (\`room_id\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_room\` ADD CONSTRAINT \`FK_0ad4c61747e954d746c626e1070\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_room\` DROP FOREIGN KEY \`FK_0ad4c61747e954d746c626e1070\``);
        await queryRunner.query(`ALTER TABLE \`user_room\` DROP FOREIGN KEY \`FK_b61991bf7b0e617ca5ed577bded\``);
        await queryRunner.query(`DROP TABLE \`user_room\``);
        await queryRunner.query(`DROP INDEX \`IDX_29fd51e9cf9241d022c5a4e02e\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`room\``);
    }

}
