import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { EntityInterface } from "src/common/interface";
import { ProjectEntity } from "src/project/entities/project";

@Entity("project_img")
export class ProjectImgEntity implements EntityInterface {
    @PrimaryColumn()
    @ManyToOne(() => ProjectEntity, project => project.no)
    @JoinColumn({
        name: "no"
    })
    no: number;

    @PrimaryColumn()
    imgNo: number;

    @Column()
    url: string;

}
