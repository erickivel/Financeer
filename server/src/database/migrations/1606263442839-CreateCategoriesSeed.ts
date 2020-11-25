import {MigrationInterface, QueryRunner} from "typeorm";
import {uuid} from 'uuidv4';

export class CreateCategoriesSeed1606263442839 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`INSERT INTO categories (name, id) VALUES ('Ações', '${uuid()}')`);
      queryRunner.query(`INSERT INTO categories (name, id) VALUES ('Fundos Imobiliários', '${uuid()}')`);
      queryRunner.query(`INSERT INTO categories (name, id) VALUES ('BDRs', '${uuid()}')`);
      queryRunner.query(`INSERT INTO categories (name, id) VALUES ('ETFs', '${uuid()}')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query("DELETE FROM categories WHERE name = 'Ações'");
      queryRunner.query("DELETE FROM categories WHERE name = 'Fundos Imobiliários'");
      queryRunner.query("DELETE FROM categories WHERE name = 'BDRs'");
      queryRunner.query("DELETE FROM categories WHERE name = 'ETFs'");
    }

}
