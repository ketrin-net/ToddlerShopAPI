import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar"})
  imgSrc: string;

  @Column({ type: "varchar", length: 100})
  imgAlt: string;

  @Column({ type: "varchar", length: 200 , unique: true})
  title: string;

  @Column({ type: "integer", width: 50 })
  cost: number;

  @Column({ type: "integer", width: 50, nullable: true })
  oldCost: number | null;;

  @Column({ type: "boolean"})
  iconNew: boolean;

  @Column({ type: "boolean"})
  inStock: boolean;
}