import { DTOInteface } from "src/common/interface";
import { TypeSwgDeco, Type } from "src/decorators/swagger";
class ProjectReplyReadDTO implements DTOInteface {
    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "댓글 번호",
        example: 1,
        required: true
    })
    replyNo: number;
    
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "내용",
        example: "댓글!!!!",
        required: true
    })
    content: string;
    
    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "좋아요 수",
        example: 0,
        required: true
    })
    likeCnt: number;
    
    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "싫어요 수",
        example: 0,
        required: true
    })
    hateCnt: number;

    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "부모 댓글 번호",
        example: 0,
        required: true
    })
    parent: number;
    
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "댓글 등록자",
        example: "ywyi1992",
        required: true
    })
    registUser: string;

    
    
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "댓글 등록날짜",
        example: "2023-08-18T15:00:00.000Z",
        required: true
    })
    registDate: string;
}

export default ProjectReplyReadDTO;