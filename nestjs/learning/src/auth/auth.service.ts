import { Injectable, Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import authConfig from "src/config/auth/auth.config";
import * as jwt from "jsonwebtoken";

export interface User {
    id: string;
    name: string
    email: string
}

@Injectable()
export class AuthService {
    constructor(@Inject(authConfig.KEY) private readonly config: ConfigType<typeof authConfig>) {}

    login(user: User): string {
        const payload = { ...user };
        return jwt.sign(payload, this.config.secret, {
            expiresIn: "1d",
            audience: "localhost",
            issuer: "nestjs learning"
        });
    }

    verify(token: string): (User | null) {
        try {
            const payload: jwt.JwtPayload = jwt.verify(token, this.config.secret) as jwt.JwtPayload;
            console.log("verify", payload);
            const { id, email } = payload;
            return {
                id, 
                email,
                name: ""
            };
        } catch(e) {
            return null;
        }
    }
}