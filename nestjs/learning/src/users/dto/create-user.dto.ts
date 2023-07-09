import { IsString, MinLength, MaxLength, IsEmail, Matches } from "class-validator"; 
import { Transform } from "class-transformer";
import { NotIn } from "../decorator/not-in";

export class CreateUserDTO {
    @Transform((params) => {
        console.log(params);
        return params.value;
    })
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    @NotIn("password", { message: "password는 name과 같은 문자열을 포함할 수 없습니다." })
    readonly name: string;

    @IsEmail()
    @MaxLength(60)
    readonly email: string;

    @IsString()
    // 예제 코드 안됨
    // @Matches(/^[A-Za-z\d!@#$%^&*()]{8, 30}$/)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,30}$/)
    readonly password: string;
}