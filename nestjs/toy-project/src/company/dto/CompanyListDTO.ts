import { DTOInteface } from "src/common/interface";
import { Type, TypeSwgDeco } from "src/decorators/swagger";

class CompanyListDTO implements DTOInteface {
    @TypeSwgDeco({
        type: Type.NUMBER,
        desc: "회사 등록 번호",
        required: true,
        example: 5
    })
    companyNo: number;
    
    @TypeSwgDeco({
        type: Type.STRING,
        desc: "회사 이름",
        required: true,
        example: "playlinks"
    })
    companyName: string;

    @TypeSwgDeco({
        type: Type.STRING,
        desc: "회사 로고",
        required: true,
        example: "https://s3-endpoint/images/company/playlinks/logo.png"
    })
    companyLogo: string;
}

export default CompanyListDTO;