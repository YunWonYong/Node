import { DTOInteface } from "src/common/interface";
import { Type, TypeSwgDeco } from "src/decorators/swagger";

class ProjectImgRegistDTO implements DTOInteface {
    no: number;

    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "이미지 번호",
        required: true,
        example: 2
    })
    imgNo: number;
    
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "이미지 url",
        required: true,
        example: "https://s3.endpoint/project/images/{projectNo}/{imgNo}.jpg"
    })
    url: string;
}

export default ProjectImgRegistDTO;