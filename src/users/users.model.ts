import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "number"})
  phone: number;
}