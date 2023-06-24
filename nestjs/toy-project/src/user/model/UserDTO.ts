import { ApiProperty } from "@nestjs/swagger"; 
import { GRADE, JOB } from "./Protocol";
export class UserDTO {

    @ApiProperty({
        required: true,
        minLength: 6,
        maxLength: 15,
        default: "ywyi1992"
    })    
    public id: string;
    

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
    public gmail: string;

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