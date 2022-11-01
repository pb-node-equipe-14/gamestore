import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('categories')
class Categories{
    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column({length:120 , nullable:false})
    name:string
}

export{Categories}