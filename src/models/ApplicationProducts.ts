import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Category from './Category';

@Entity('application_products')
class ApplicationProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_name: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, category => category.applicationProduct, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  first_application_date: Date;

  @Column()
  financial_institution: string;

  @Column()
  value_applied: number;

  @Column()
  movement_type: 'application' | 'redemption';

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ApplicationProduct;
