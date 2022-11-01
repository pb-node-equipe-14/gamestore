import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
class Category{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({length:120 , unique: true})
    name:string
}
export{ Category }