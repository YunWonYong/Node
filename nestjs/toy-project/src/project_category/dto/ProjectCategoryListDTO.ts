import { DTOInteface } from "src/common/interface";
import { Type, TypeSwgDeco } from "src/decorators/swagger";

export default class ProjectCategoryListDTO implements DTOInteface {
    
    @TypeSwgDeco({
        desc: "카테고리 코드 중복 X",
        type: Type.NUMBER,
        example: 100
    })
    categoryCode: number;
	
    @TypeSwgDeco({
        desc: "project 만들 때 선택할 카테고리 명",
        type: Type.STRING,
        required: true,
        example: "슈팅"
    })
    categoryName: string;
}