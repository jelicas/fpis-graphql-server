import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RequisitionItem } from './RequisitionItem';
import { User } from './User';

@Entity()
export class Requisition extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('date', {
    nullable: true,
    name: 'date_created',
  })
  dateCreated: Date | null;

  @Column('varchar', {
    nullable: true,
    name: 'serial_number',
  })
  serialNumber: string | null;

  @ManyToOne(type => User, user => user.requisitions, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: User | null;

  @OneToMany(type => RequisitionItem, requisitionItem => requisitionItem.requisition, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  requisitionItems: RequisitionItem[];
}
