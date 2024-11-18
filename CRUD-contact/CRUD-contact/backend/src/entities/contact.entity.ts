import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, OneToMany } from "typeorm"


@Entity('contacts')
export class contactsEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    first_name!: string

    @Column()
    last_name!: string

    @Column()
    email!: string

    @Column()
    phone_number!: string

    @Column()
    company!: string

    @Column()
    job_title!: string
}