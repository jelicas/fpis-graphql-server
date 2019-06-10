import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Product } from './Product';

@Entity()
export class PriceHistory extends BaseEntity {
  @ManyToOne(type => Product, product => product.priceHistory, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;

  @Column('datetime', {
    nullable: false,
    primary: true,
    name: 'change_date',
  })
  changeDate: Date;

  @Column('double', {
    nullable: false,
    name: 'price',
  })
  price: number;
}
