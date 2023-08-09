import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyEntity } from "./entities/company";
import { Repository } from "typeorm";
import { dtoToEntity, getCurrentDate, entityListToDTOList, entityToDTO } from "src/common/util";
import { ModifyResultType, RegistResultType } from "src/common/types";
import { CompanyRegistDTO, CompanyReadDTO, CompanyModifyDTO, CompanyListDTO } from "./dto";

@Injectable()
class CompanyService {

    @InjectRepository(CompanyEntity)
    private readonly repository: Repository<CompanyEntity>;

    public list(): Promise<CompanyListDTO[]> {
        return new Promise((resolve, reject) => {
            this.repository
                .find()
                .then((result: CompanyEntity[]) => {
                    const copyDTO = new CompanyListDTO();
                    copyDTO.companyLogo = "";
                    copyDTO.companyName = "";
                    copyDTO.companyNo = 0;
                    resolve(entityListToDTOList(result, copyDTO));
                }).catch(reject);
        });
    }

    public regist(dto: CompanyRegistDTO): Promise<RegistResultType<number>> {
        return new Promise((resolve, reject) => {
            try {
                const entity = dtoToEntity(dto, new CompanyEntity());
                this.repository
                    .save(entity)
                    .then((saveEntity) => {
                        resolve({
                            pk: saveEntity.companyNo,
                            result: saveEntity.companyName === entity.companyName? "success": "fail"    
                        });
                    })
                    .catch(reject);
            } catch(e) {
                reject(e);
            }
        });
    }

    public findOne(companyNo: number): Promise<CompanyReadDTO> {
        return new Promise((resolve, reject) => {
            this.repository
                .findOne({
                    where: {
                        companyNo
                    }
                })
                .then((entity: CompanyEntity | null) => {
                    if(entity === null) {
                        reject(new NotFoundException(`companyNo(${companyNo}) not found`));
                        return;
                    }
                    let readDTO = new CompanyReadDTO();
                    readDTO.companyName = "";
                    readDTO.companyLogo = "";
                    readDTO.companyAddress = "";
                    readDTO.companyAddressDetail = "";
                    readDTO.companyZipcode = 0;
                    readDTO.companyTel = "";
                    readDTO = entityToDTO(entity, readDTO);
                    if (readDTO.companyName === "") {
                        reject(new NotFoundException(`companyNo(${companyNo}) not found`));
                        return;
                    }
                    resolve(readDTO);
                })
                .catch(reject)
        });
    }

    public modify(companyNo: number, dto: CompanyModifyDTO): Promise<ModifyResultType<number>> {
        return new Promise((resolve, reject) => {
            try {
                const entity = dtoToEntity(dto, new CompanyEntity());
                const updateDate = getCurrentDate();
                entity.updateDate = updateDate;
                this.repository
                    .update(companyNo, entity)
                    .then(({ affected }) => {
                        if (affected === 0 || affected === undefined) {
                            reject(new NotFoundException(`companyNo(${companyNo}) not found`));
                            return;
                        }
                        resolve({
                            result: "success",
                            pk: companyNo,
                            affected
                        });
                    })
                    .catch(reject);
            } catch(e) {
                reject(e);
            }
        });
    }
}

export default CompanyService;