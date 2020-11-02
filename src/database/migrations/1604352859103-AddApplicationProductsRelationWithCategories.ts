import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddApplicationProductsRelationWithCategories1604352859103
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'application_products',
      new TableForeignKey({
        name: 'ApplicationProductsCategory',
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        columnNames: ['category_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'application_products',
      'ApplicationProductsCategory',
    );
  }
}
