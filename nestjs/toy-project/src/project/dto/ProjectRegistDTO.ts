import { DTOInteface } from "src/common/interface";
import { Type, TypeSwgDeco } from "src/decorators/swagger";

class ProjectRegistDTO implements DTOInteface {
    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "카테고리 코드",
        required: true,
        example: 0
    })
    categoryCode: number;

    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "회사 번호",
        required: true,
        example: 7
    })
    companyNo: number;

    @TypeSwgDeco({
        type: Type.STRING,
        desc: "프로젝트 이름",
        required: true,
        example: "plinkcasino"
    })
    name: string;

    @TypeSwgDeco({
        type: Type.DATE_STRING,
        desc: "프로젝트 시작일",
        required: true,
        example: "2023-08-09"
    })
    startDate: string;

    @TypeSwgDeco({
        type: Type.DATE_STRING,
        desc: "프로젝트 오픈일"
    })
    openDate: string;

    @TypeSwgDeco({
        type: Type.STRING,
        desc: "비고"
    })
    note: string;
    
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "회사 등록 사용자",
        required: true,
        example: "ywy"
    })
    registUser: string;
}

export default ProjectRegistDTO;