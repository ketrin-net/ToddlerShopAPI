import { Subcategory } from "src/subcategory/subcategory.model";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm"

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, unique: true })
  name: string;

  @OneToMany(() => Subcategory, (subCategory) => subCategory.category)
  @JoinTable()
  subCategory: Subcategory[];
}