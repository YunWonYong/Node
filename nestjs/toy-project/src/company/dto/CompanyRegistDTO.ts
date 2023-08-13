import { DTOInteface } from "src/common/interface";
import { Type, TypeSwgDeco } from "src/decorators/swagger";

class CompanyRegistDTO implements DTOInteface {
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "회사 이름",
        required: true,
        example: "playlinks"
    })
    companyName: string;
    
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "회사 주소",
        required: true,
        example: "경기도 성남시 분당구 황새울로360번길 42"
    })
    companyAddress: string;
    
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "회사 상세주소",
        example: "서현프라자 16층"
    })
    companyAddressDetail: string;
    
    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "회사 우편번호",
        required: true,
        example: 13591
    })
    companyZipcode: number;
    
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "회사 로고",
        required: true,
        example: "https://s3-endpoint/images/company/playlinks/logo.png"
    })
    companyLogo: string;

    @TypeSwgDeco({
        type: Type.STRING,
        desc: "회사 전화번호",
        required: true,
        example: "031-702-8818"
    })
    companyTel: string;
    
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "회사 등록 사용자",
        required: true,
        example: "ywy"
    })
    registUser: string;
}

export default CompanyRegistDTO;