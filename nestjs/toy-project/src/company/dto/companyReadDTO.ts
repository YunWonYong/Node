import { DTOInteface } from "src/common/interface";
import { Type, TypeSwgDeco } from "src/decorators/swagger";

class CompanyReadDTO implements DTOInteface {
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
        example: "경기도 성남시 분당구 황새울로 216"
    })
    companyAddress: string;
    
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "회사 상세주소",
        example: "휴맥스빌리지 10층"
    })
    companyAddressDetail: string;
    
    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "회사 우편번호",
        required: true,
        example: 13595
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
}

export default CompanyReadDTO;