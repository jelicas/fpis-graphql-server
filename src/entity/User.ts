import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { TypeOfEmployee } from './TypeOfEmployee';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: Number;

	@Column() name: string;

	@Column() surname: string;

	@Column() username: string;

	@Column() email: string;

	@Column() password: string;

	@Column() pid: string;

	@Column() biography: string;

	@Column() address: string;

	@Column() telephone: string;

	@ManyToOne((type) => TypeOfEmployee, (typeOfEmployee) => typeOfEmployee.users)
	type: TypeOfEmployee;
}
