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

@Entity('supplier', { schema: 'fpis' })
// @Index('Supplier_partner_taxIdNum_fk', ['taxIdNum'], { unique: true })
export class Supplier extends BaseEntity {
  @PrimaryColumn({ name: 'TaxIdNum' })
  taxIdNum: string;

  @OneToOne(type => Partner, partner => partner.supplier, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TaxIdNum' })
  partner: Partner | null;

  @Column('varchar', {
    nullable: false,
    name: 'RegNum',
  })
  regNum: string;

  //done
  @OneToMany(type => Catalog, catalog => catalog.supplier, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  catalogs: Catalog[] | null;

  //done
  @OneToMany(type => Order, order => order.supplier, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  orders: Order[] | null;

  //done
  @OneToMany(type => ProductPerSupplier, productPerSupplier => productPerSupplier.supplier, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  productsPerSupplier: ProductPerSupplier[] | null;
}
