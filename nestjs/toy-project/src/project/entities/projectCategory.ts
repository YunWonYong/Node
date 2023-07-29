import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("project_category")
export class ProjectCategoryEntity {
    @PrimaryGeneratedColumn()
    category_code: number;
    
    @Column()
    category_name: string;

    @Column()
    regist_user: string;

    @Column()
    regist_date: string;

    @Column()
    update_user: string;

    @Column()
    update_date: string;

    @Column()
    yn: string;
}