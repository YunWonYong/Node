import { IsString, MinLength, MaxLength, IsEmail } from "class-validator"; 
export class CreateUserDTO {
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    readonly name: string;

    @IsEmail()
    readonly email: string;
    readonly password: string;
}