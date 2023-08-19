import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { EntityInterface } from "src/common/interface";
import { ProjectEntity } from "src/project/entities/project";

@Entity("project_reply")
export class ProjectReplyEntity implements EntityInterface {
    @PrimaryColumn()
    @ManyToOne(() => ProjectEntity, project => project.no)
    @JoinColumn({
        name: "no"
    })
    no: number;

    @PrimaryColumn()
    replyNo: number;

    @Column()
    content: string;

    @Column()
    like_cnt: number;

    @Column()
    hate_cnt: number;

    @Column()
    parent: number;

    @Column()
    showFlag: boolean;

    @Column()
    registUser: string;

    @Column()
    registDate: string;
    
    @Column()
    updateUser: string;

    @Column()
    updateDate: string;
}