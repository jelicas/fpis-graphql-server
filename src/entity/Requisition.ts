import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RequisitionItem } from './RequisitionItem';
import { User } from './User';

@Entity('requisition', { schema: 'fpis' })
@Index('Requisition_user_id_fk', ['employee'])
export class Requisition {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'ID',
  })
  id: number;

  @Column('int', {
    nullable: true,
    name: 'DateCreated',
  })
  dateCreated: number | null;

  @Column('int', {
    nullable: true,
    name: 'SerialNumber',
  })
  serialNumber: number | null;

  @ManyToOne(type => User, user => user.requisitions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'EmployeeID' })
  employee: User | null;

  @OneToMany(type => RequisitionItem, requisitionItem => requisitionItem.requisition, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  requisitionItems: RequisitionItem[];
}
