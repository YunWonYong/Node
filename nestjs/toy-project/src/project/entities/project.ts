import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProjectCategoryEntity } from "./projectCategory";

@Entity("project")
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    no: number;

    @OneToOne(() => ProjectCategoryEntity)
    @JoinColumn({
        name: "category_code"
    })
    categoryCode: number;

    @Column()
    name: string;

    @Column()
    company: string;

    @Column()
    companyAddress: string;

    @Column()
    startDate: string;

    @Column()
    openDate: string;

    @Column()
    note: string;

    @Column()
    yn: string;

    @Column()
    registUser: string;

    @Column()
    registDate: string;
}