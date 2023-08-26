import { DTOInteface } from "src/common/interface";
import ProjectReplyReadDTO from "src/project_reply/dto/ProjectReplyReadDTO";

class ProjectReadDTO implements DTOInteface {
    no: number;
    name: string;
    categoryName: string;
    startDate: string;
    openDate: string;
    note: string;
    companyName: string;
    companyLogo: string;
    imgs: string[];
    replys: ProjectReplyReadDTO[];

    constructor() {
        this.no = 0;
        this.name = "";
        this.startDate = "";
        this.openDate = "";
        this.note = "";
    }
}
export default ProjectReadDTO;