import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

import { Catalog } from './Catalog';
import { Order } from './Order';
import { OrderItem } from './OrderItem';
import { Partner } from './Partner';
import { ProductPerSupplier } from './ProductPerSupplier';

@Entity('supplier', { schema: 'fpis' })
@Index('REL_9129c38ec99f6c1261d9f9ae32', ['taxIdNum'], { unique: true })
export class Supplier {
  @OneToOne(type => Partner, partner => partner.supplier, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TaxIdNum' })
  taxIdNum: Partner | null;

  @Column('varchar', {
    nullable: false,
    name: 'RegNum',
  })
  RegNum: string;

  @OneToOne(type => Catalog, catalog => catalog.taxIdNum, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  catalog: Catalog | null;

  @OneToOne(type => OrderItem, orderItem => orderItem.supplier, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  orderItem: OrderItem | null;

  @OneToOne(type => Order, order => order.supplier, { onDelete: 'NO ACTION', onUpdate: 'CASCADE' })
  order: Order | null;

  @OneToOne(type => ProductPerSupplier, productPerSupplier => productPerSupplier.taxIdNum, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  productPerSupplier: ProductPerSupplier | null;
}
