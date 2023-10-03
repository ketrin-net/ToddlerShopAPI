import { Category } from "src/modules/category/category.model";
import { Products } from "src/modules/products/products.model";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, unique: true })
  name: string;

  @ManyToOne(() => Category, (category) => category.subCategory)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @ManyToMany(() => Products, (products) => products.subCategory)
  @JoinTable()
  products: Products[];
}