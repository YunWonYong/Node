import { Entity, Column, PrimaryColumn } from "typeorm";
import { EntityInterface } from "src/common/interface";

@Entity("project_img")
export class ProjectImgEntity implements EntityInterface {
    @PrimaryColumn()
    no: number;

    @PrimaryColumn()
    imgNo: number;

    @Column()
    url: string;

}
