import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Product } from './Product';

@Entity('price_history', { schema: 'fpis' })
export class PriceHistory {
  @ManyToOne(type => Product, product => product.priceHistory, {
    primary: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ProductID' })
  product: Product | null;

  @Column('datetime', {
    nullable: false,
    primary: true,
    name: 'ChangeDate',
  })
  changeDate: Date;

  @Column('double', {
    nullable: false,
    name: 'Price',
  })
  price: number;
}
