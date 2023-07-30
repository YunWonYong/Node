import { IsNumber, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProjectCategoryDTO {
    
    @IsNumber()
    @ApiProperty({
        description: "카테고리 코드 중복 X",
    })
    categoryCode: number;
	
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "project 만들 때 선택할 카테고리 명"
    })
    categoryName: string;
	
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "등록자 이니셜 명시",
    })
    registUser:	string;
}