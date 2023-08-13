import { DTOInteface } from "src/common/interface";

class ProjectListDTO implements DTOInteface {
    no: number;
    name: string;
    categoryName: string;
    startDate: string;
    openDate: string;
    note: string;
    companyName: string;
    companyLogo: string;
    img: string;

    constructor() {
        this.no = 0;
        this.name = "";
        this.startDate = "";
        this.openDate = "";
        this.note = "";
        this.img;
    }
}
export default ProjectListDTO;