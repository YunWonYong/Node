import { EntityInterface } from "src/common/interface";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("project_category")
export class ProjectCategoryEntity implements EntityInterface {
    @PrimaryColumn()
    categoryCode: number;
    
    @Column()
    categoryName: string;

    @Column()
    registUser: string;

    @Column()
    registDate: string;

    @Column()
    updateUser: string;

    @Column()
    updateDate: string;

    @Column()
    yn: string;
}