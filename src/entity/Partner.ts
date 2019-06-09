import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { City } from './City';
import { Supplier } from './Supplier';

@Entity('partner', { schema: 'fpis' })
@Index('FK_0f99c560f72b3e48972790333b8', ['cityAreaCode'])
export class Partner {
  @Column('varchar', {
    nullable: false,
    primary: true,
    name: 'TaxIdNum',
  })
  taxIdNum: string;

  @Column('varchar', {
    nullable: false,
    name: 'Name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'Address',
  })
  address: string;

  @ManyToOne(type => City, city => city.partners, { onDelete: 'NO ACTION', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'CityAreaCode' })
  cityAreaCode: City | null;

  @OneToOne(type => Supplier, supplier => supplier.taxIdNum, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  supplier: Supplier | null;
}
