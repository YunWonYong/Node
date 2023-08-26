import { Column, Entity, OneToOne, OneToMany , JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProjectCategoryEntity } from "../../project_category/entities/projectCategory";
import { CompanyEntity } from "src/company/entities/company";
import { EntityGetterInterface, EntitySetterInterface } from "src/common/interface";
import { ProjectListDTO } from "../dto";
import { ProjectImgEntity } from "src/project_img/entities/projectImg";
import { ProjectReplyEntity } from "src/project_reply/entities/projectReply";
import ProjectReadDTO from "../dto/ProjectReadDTO";
import ProjectReplyReadDTO from "src/project_reply/dto/ProjectReplyReadDTO";

@Entity("project")
export class ProjectEntity implements EntitySetterInterface, EntityGetterInterface {
    @PrimaryGeneratedColumn()
    no: number;

    // [TODO] 중복 코드 제거 생각해보기
    @OneToOne(() => ProjectCategoryEntity)
    @JoinColumn({
        name: "category_code"
    })
    category: ProjectCategoryEntity;

    @OneToOne(() => CompanyEntity)
    @JoinColumn({
        name: "company_no"
    })
    company: CompanyEntity;

    @OneToMany(() => ProjectImgEntity, imgs => imgs.no)
    @JoinColumn({
        name: "no"
    })
    imgs: ProjectImgEntity[];

    @OneToMany(() => ProjectReplyEntity, replys => replys.no)
    replys: ProjectReplyEntity[];

    @Column()
    name: string;

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

    /* eslint-disable @typescript-eslint/no-unused-vars */
    set(key: string, value: any) {
        // [TODO] 개선할 방법 찾기
        if (this.company === undefined) {
            this.company = new CompanyEntity();
        }

        if (this.category === undefined) {
            this.category = new ProjectCategoryEntity();
        }

        if (key.indexOf("company") > -1) {
            eval("this.company[key] = value");
        } else if (key.indexOf("category") > -1) {
            eval("this.category[key] = value");
        } else {
            eval("this[key] = value");
        }
    }

    get<T>(dto: T): T {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        Object.keys(dto as object).forEach(key => {
            eval("dto[key] = this[key]");
        });

        if (dto instanceof ProjectListDTO) {
            dto.categoryName = this.category.categoryName;
            dto.companyName = this.company.companyName;
            dto.companyLogo = this.company.companyLogo;
            if (this.imgs[0]) {
                dto.img = this.imgs[0].url;
            }
        } else if (dto instanceof ProjectReadDTO) {
            dto.imgs = this.imgs.map(img => img.url);
            dto.replys = this.replys.map(reply => {
                const replyReadDTO = new ProjectReplyReadDTO();
                replyReadDTO.replyNo = reply.replyNo;
                replyReadDTO.content = reply.content;
                replyReadDTO.likeCnt = reply.like_cnt;
                replyReadDTO.hateCnt = reply.hate_cnt;
                replyReadDTO.parent = reply.parent;
                replyReadDTO.registUser = reply.registUser;
                replyReadDTO.registDate = reply.registDate;
                return replyReadDTO;
            });
        }

        return dto;
    }
}