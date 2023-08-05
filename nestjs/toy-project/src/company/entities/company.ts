import { EntityInterface } from "src/common/interface";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("company")
export class CompanyEntity implements EntityInterface {
    @PrimaryGeneratedColumn()
    companyNo: number;
    
    @Column()
    companyName: string;

    @Column()
    companyAddress: string;

    @Column()
    companyAddressDetail: string;

    @Column()
    companyZipcode: number;

    @Column()
    companyLogo: string;
    
    @Column()
    companyTel: string;

    @Column()
    registUser: string;

    @Column()
    registDate: string;

    @Column()
    updateUser: string;

    @Column()
    updateDate: string;
}