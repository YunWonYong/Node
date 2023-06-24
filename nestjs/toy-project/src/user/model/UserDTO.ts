import { ApiProperty } from "@nestjs/swagger"; 
import { GRADE, JOB } from "./Protocol";
import { User, UserInfo } from "./UserInterface";

class UserInfoDTO implements UserInfo {
    @ApiProperty({
        required: true,
        default: "cat"
    })    
    public nickName: string;

    @ApiProperty({
        default: GRADE.USER,
        enum: GRADE
    })
    public grade: GRADE;

    @ApiProperty({
        required: true,
        default: "ywyi1992@gmail.com"
    })
    public email: string;

    @ApiProperty({
        required: true,
        default: 32
    })
    public age: number;

    @ApiProperty({
        required: false,
        default: JOB.NORMAL,
        enum: { ...JOB }
    })
    public job: JOB;
}

class UserDTO implements User {
    @ApiProperty({
        required: true,
        minLength: 6,
        maxLength: 15,
        default: "ywyi1992"
    })    
    public id: string;
    
    @ApiProperty({
        type: UserInfoDTO
    })
    public info: UserInfo;
    
}


export {
    UserDTO,
    UserInfoDTO
}