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

@Entity('movements')
class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_name: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, category => category.movement, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column('timestamp')
  movement_date: Date;

  @Column()
  financial_institution: string;

  @Column()
  movement_value: number;

  @Column()
  movement_type: 'application' | 'redemption';

  @Column('integer')
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Movement;
