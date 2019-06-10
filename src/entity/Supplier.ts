import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { Catalog } from './Catalog';
import { Order } from './Order';
import { Partner } from './Partner';
import { ProductPerSupplier } from './ProductPerSupplier';

@Entity()
export class Supplier extends BaseEntity {
  @PrimaryColumn({ name: 'tax_id_num' })
  taxIdNum: string;

  @OneToOne(type => Partner, partner => partner.supplier, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tax_id_num' })
  partner: Partner | null;

  @Column('varchar', {
    nullable: false,
    name: 'reg_num',
  })
  regNum: string;

  @OneToMany(type => Catalog, catalog => catalog.supplier, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  catalogs: Catalog[] | null;

  @OneToMany(type => Order, order => order.supplier, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  orders: Order[] | null;

  @OneToMany(type => ProductPerSupplier, productPerSupplier => productPerSupplier.supplier, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  productsPerSupplier: ProductPerSupplier[] | null;
}
