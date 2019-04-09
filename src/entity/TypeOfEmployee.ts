import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class TypeOfEmployee extends BaseEntity {
	@PrimaryGeneratedColumn() id: Number;

	@Column() title: string;

	@OneToMany((type) => User, (user) => user.type)
	users: User[];
}
