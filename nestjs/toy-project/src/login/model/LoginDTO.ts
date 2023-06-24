import { ApiProperty } from "@nestjs/swagger";
import { Login } from "./LoginInterface";

class LoginDTO implements Login {
    
    @ApiProperty({
        required: true,
        minLength: 6,
        maxLength: 15,
        default: "ywyi1992"
    })    
    public id: string;
    
    @ApiProperty({
        required: true,
        minLength: 12,
        maxLength: 18
    })
    public password: string;
}

export {
    LoginDTO
}