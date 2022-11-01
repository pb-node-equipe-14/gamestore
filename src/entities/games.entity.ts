import { Column, Entity,ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Categories } from "./categories.entity"


@Entity()
class Games{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({nullable:false})
    name:string

    @Column({type: "decimal",precision:12,scale:2})
    price:number

    @Column()
    age:number

    @Column({nullable:false})
    launch:Date

    @Column()
    description:string

    @Column()
    developer:string

    @ManyToOne(()=> Categories) 
    id_category:Categories
}

export {Games}













