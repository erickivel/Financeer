import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddMovementsRelationWithCategories1604352859103
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'movements',
      new TableForeignKey({
        name: 'MovementCategory',
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        columnNames: ['category_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('movements', 'MovementCategory');
  }
}
