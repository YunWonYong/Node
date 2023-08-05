import { Type, TypeSwgDeco } from "src/decorators/swagger";

export class ProjectRegistDTO {
    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "카테고리 코드",
        required: true
    })
    categoryCode: number;

    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "회사 번호",
        required: true
    })
    companyNo: number;

    @TypeSwgDeco({
        type: Type.STRING,
        desc: "프로젝트 이름",
        required: true
    })
    name: string;

    @TypeSwgDeco({
        type: Type.DATE_STRING,
        desc: "프로젝트 시작일",
        required: true
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
}