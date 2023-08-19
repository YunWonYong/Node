import { DTOInteface } from "src/common/interface";
import { Type, TypeSwgDeco } from "src/decorators/swagger";
class ProjectReplyRegistDTO implements DTOInteface {
    no: number;
    parent: number;

    @TypeSwgDeco({
        type: Type.STRING,
        desc: "내용",
        example: "댓글!!!!",
        required: true
    })
    content: string;

    @TypeSwgDeco({
        type: Type.STRING,
        desc: "등록자",
        example: "ywy",
        required: true
    })
    registUser: string;

}

export default ProjectReplyRegistDTO;