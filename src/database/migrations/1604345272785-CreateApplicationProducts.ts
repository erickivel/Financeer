import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateApplicationProducts1604345272785
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'application_products',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'product_name',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'first_application_date',
            type: 'timestamp',
          },
          {
            name: 'financial_institution',
            type: 'varchar',
          },
          {
            name: 'value_applied',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'movement_type',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('application_products');
  }
}
