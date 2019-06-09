import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProductState } from './ProductState';

@Entity('storage_unit', { schema: 'fpis' })
export class StorageUnit {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'ID',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'Name',
  })
  name: string;

  @OneToMany(type => ProductState, productState => productState.storageUnit, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  productStates: ProductState[];
}
